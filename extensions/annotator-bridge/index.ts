// OMP Annotator Bridge — the `/listen` companion for the browser and VS Code
// annotator clients in ../chrome-extension and ../vscode-extension.
//
// `pi.registerCommand("listen")` starts a local Bun HTTP server that:
//   • answers `GET /__bridge/ping`  → { service, sessionId, port }
//   • answers `GET /__bridge/config`→ { sessionId, port, wsUrl }
//   • accepts `POST /__bridge/send` → injects the annotation batch as a user
//     turn via pi.sendUserMessage (followUp while streaming, prompt when idle)
//   • serves `GET /__bridge/ws` as a WebSocket publishing `reload` and
//     `highlight` messages to attached clients
//
// Loopback only; one bridge per OMP session. A second `/listen` in the same
// session returns the running one. Port probing walks 4747..4756 when the
// default is busy, mirroring the README contract.

import type { ExtensionAPI, ExtensionCommandContext } from "@oh-my-pi/pi-coding-agent";

const PORT_RANGE_START = 4747;
const PORT_RANGE_END = 4756;

type BridgeServer = Bun.Server<undefined>;
type BridgeSocket = { send: (data: string) => void };
interface BridgePayload {
	sessionId?: unknown;
	pageUrl?: unknown;
	pageTitle?: unknown;
	subject?: unknown;
	client?: unknown;
	capturedAt?: unknown;
	message?: unknown;
	annotations?: unknown;
}

interface AnnotationQueueState {
	server: BridgeServer | null;
	port: number | null;
	sessionId: string | null;
	sockets: Set<BridgeSocket>;
	delivered: number;
}

export default function annotatorBridge(pi: ExtensionAPI) {
	const state: AnnotationQueueState = { server: null, port: null, sessionId: null, sockets: new Set(), delivered: 0 };

	const json = (data: unknown, status = 200, origin: string | null = null): Response =>
		new Response(JSON.stringify(data), {
			status,
			headers: {
				"content-type": "application/json",
				...(origin
					? {
							"access-control-allow-origin": origin,
							"access-control-allow-headers": "content-type",
							"vary": "Origin",
						}
					: {}),
			},
		});

	function broadcast(message: Record<string, unknown>) {
		for (const socket of state.sockets) {
			try {
				socket.send(JSON.stringify(message));
			} catch {
				state.sockets.delete(socket);
			}
		}
	}

	function formatBatch(payload: BridgePayload, sessionId: string): string {
		const subject = typeof payload.subject === "string" && payload.subject ? payload.subject : "page";
		const annotations = Array.isArray(payload.annotations) ? payload.annotations : [];
		const lines: string[] = [];
		lines.push(`📝 **Annotációk érkeztek (${subject}) — ${annotations.length} elem**`);
		const pageUrl = typeof payload.pageUrl === "string" ? payload.pageUrl : "";
		const pageTitle = typeof payload.pageTitle === "string" ? payload.pageTitle : "";
		if (pageTitle || pageUrl) lines.push(`Oldal: ${pageTitle}${pageUrl ? ` — ${pageUrl}` : ""}`);
		const note = typeof payload.message === "string" ? payload.message.trim() : "";
		if (note) lines.push(`Üzenet: ${note}`);
		lines.push("");
		for (const [i, raw] of annotations.entries()) {
			const a = (raw ?? {}) as Record<string, unknown>;
			const kind = typeof a.kind === "string" ? a.kind : "note";
			const target =
				typeof a.xpath === "string" && a.xpath
					? `\`${a.xpath}\``
					: typeof a.pageUrl === "string" && a.pageUrl
						? a.pageUrl
						: "(nincs cél)";
			const snippet = typeof a.elementSnippet === "string" ? a.elementSnippet.trim() : "";
			const selected = typeof a.selectedText === "string" ? a.selectedText.trim() : "";
			const body = typeof a.note === "string" ? a.note.trim() : "";
			lines.push(`${i + 1}. **[${kind}]** ${target}`);
			if (snippet) lines.push(`   elem: ${snippet.slice(0, 200)}`);
			if (selected) lines.push(`   kijelölés: „${selected.slice(0, 240)}"`);
			if (body) lines.push(`   megjegyzés: ${body}`);
			const region = a.region as Record<string, number> | undefined;
			if (region && typeof region.xNorm === "number") {
				lines.push(
					`   kép régió: x=${region.xNorm.toFixed(3)} y=${region.yNorm.toFixed(3)} w=${(region.wNorm ?? 0).toFixed(3)} h=${(region.hNorm ?? 0).toFixed(3)}`,
				);
			}
		}
		lines.push("");
		lines.push(`_Küldte: ${typeof payload.client === "string" ? payload.client : "ismeretlen kliens"} · bridge session: ${sessionId}_`);
		return lines.join("\n");
	}

	function stop() {
		if (!state.server) return;
		try {
			state.server.stop(true);
		} catch {
			// already gone
		}
		state.server = null;
		state.port = null;
		state.sessionId = null;
		state.sockets.clear();
	}

	async function start(): Promise<{ port: number; sessionId: string }> {
		if (state.server && state.port && state.sessionId) return { port: state.port, sessionId: state.sessionId };
		const sessionId = crypto.randomUUID();

		const handler = async (req: Request, server: BridgeServer): Promise<Response | undefined> => {
			const url = new URL(req.url);
			// Echo the caller's Origin so content scripts on any http(s) page
			// can read bridge responses (loopback-only server; the origin is
			// only echoed back verbatim, never widened to "*").
			const origin = req.headers.get("origin");
			if (req.method === "OPTIONS" && req.headers.get("access-control-request-method")) {
				return new Response(null, {
					status: 204,
					headers: {
						"access-control-allow-origin": origin ?? "*",
						"access-control-allow-methods": "GET, POST, OPTIONS",
						"access-control-allow-headers": "content-type",
						"access-control-max-age": "600",
					},
				});
			}
			if (url.pathname === "/__bridge/ping") {
				return json({ service: "omp-annotator", sessionId: state.sessionId, port: state.port }, 200, origin);
			}
			if (url.pathname === "/__bridge/config") {
				return json({ sessionId: state.sessionId, port: state.port, wsUrl: `ws://127.0.0.1:${state.port}/__bridge/ws` }, 200, origin);
			}
			if (url.pathname === "/__bridge/ws") {
				if (server.upgrade(req)) return undefined;
				return json({ error: "websocket upgrade failed" }, 400, origin);
			}
			if (url.pathname === "/__bridge/send" && req.method === "POST") {
				try {
					const raw: unknown = await req.json();
					const payload = (raw ?? {}) as BridgePayload;
					if (!Array.isArray(payload.annotations) || payload.annotations.length === 0) {
						return json({ error: "no annotations" }, 400, origin);
					}
					if (typeof payload.sessionId === "string" && payload.sessionId !== state.sessionId) {
						return json({ error: "sessionId mismatch" }, 409, origin);
					}
					const text = formatBatch(payload, sessionId);
					// Idle → prompt now; streaming → queue as followUp so the
					// current run is never interrupted (README contract).
					// sendMessage with followUp works both when idle (starts a turn)
					// and while streaming (queued); sendUserMessage lacks followUp.
					pi.sendMessage(
						{ customType: "omp.annotator.batch", attribution: "user", content: text },
						{ deliverAs: "followUp", triggerTurn: true },
					);
					return json({ ok: true, received: payload.annotations.length, totalDelivered: state.delivered }, 200, origin);
				} catch {
					return json({ error: "invalid json" }, 400, origin);
				}
			}
			return undefined;
		};

		for (let port = PORT_RANGE_START; port <= PORT_RANGE_END; port++) {
			try {
				state.server = Bun.serve({
					port,
					hostname: "127.0.0.1",
					fetch: handler,
					websocket: {
						message: () => {
							// Clients are receive-only; agent-driven frames go out via broadcast.
						},
						open: (ws) => {
							state.sockets.add(ws);
						},
						close: (ws) => {
							state.sockets.delete(ws);
						},
					},
				});
				state.port = port;
				state.sessionId = sessionId;
				return { port, sessionId };
			} catch (error) {
				if (port === PORT_RANGE_END) throw error;
				// EADDRINUSE → try next port
			}
		}
		throw new Error("unreachable");
	}

	pi.registerCommand("listen", {
		description: "Start the annotator bridge (ports 4747..4756)",
		handler: async (_args: string, ctx: ExtensionCommandContext) => {
			try {
				const { port, sessionId } = await start();
				ctx.ui.notify(`Annotator bridge: http://127.0.0.1:${port} (session ${sessionId.slice(0, 8)})`, "info");
			} catch (error) {
				ctx.ui.notify(`Annotator bridge failed: ${String(error)}`, "error");
			}
		},
	});

	pi.registerCommand("listen-stop", {
		description: "Stop the annotator bridge",
		handler: async (_args: string, ctx: ExtensionCommandContext) => {
			if (!state.server) {
				ctx.ui.notify("Annotator bridge is not running", "info");
				return;
			}
			stop();
			ctx.ui.notify("Annotator bridge stopped", "info");
		},
	});
	pi.registerTool({
		name: "annotator_reload_page",
		label: "Annotator: Reload Pages",
		description: "Ask annotator-attached browser tabs to reload (auto if the user is idle)",
		parameters: pi.zod.object({ reason: pi.zod.string().optional() }),
		async execute(_id, params: { reason?: string }) {
			broadcast({ type: "reload", reason: params.reason ?? "agent requested reload", auto: true });
			return { content: [{ type: "text", text: `reload signaled to ${state.sockets.size} tab(s)` }], details: {} };
		},
	});

	pi.registerTool({
		name: "annotator_highlight",
		label: "Annotator: Highlight Element",
		description: "Scroll to and flash an element in annotator-attached browser tabs by XPath",
		parameters: pi.zod.object({ xpath: pi.zod.string() }),
		async execute(_id, params: { xpath: string }) {
			broadcast({ type: "highlight", xpath: params.xpath });
			return { content: [{ type: "text", text: `highlight signaled for ${params.xpath}` }], details: {} };
		},
	});

	pi.on("session_shutdown", () => stop());
}