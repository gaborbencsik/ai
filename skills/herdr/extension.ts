import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { createHerdrRunner, type HerdrRunner } from "./herdr-client.ts";
import { focusAgent, getAgentStatus, readAgent, spawnAgent } from "./operations.ts";
import type { OperationResult, ReadSource } from "./contracts.ts";

function toolResponse(result: OperationResult) {
  const text = result.ok
    ? result.operation === "spawn"
      ? `Started ${result.agent.name} in background tab ${result.topology.tabId}, pane ${result.topology.paneId}; prompt submitted once.`
      : result.operation === "status"
        ? `Herdr status returned ${result.agents.length} agent(s).`
        : result.operation === "read"
          ? result.output
          : `Focused ${result.agent.name ?? result.agent.pane_id}.`
    : `Herdr ${result.operation} failed at ${result.stage}: ${result.error.code}: ${result.error.message}`;
  return { content: [{ type: "text" as const, text }], details: result };
}

export function registerHerdrAgentTools(pi: ExtensionAPI, runner: HerdrRunner) {
  pi.setLabel("Herdr Agent");
  const z = pi.zod;

  pi.registerTool({
    name: "herdr_spawn",
    label: "Spawn Herdr Agent",
    description: "Start one OMP agent in a new background Herdr tab in the current workspace and cwd, then submit the prompt exactly once. Use for explicit requests to run a prompt in a new Herdr tab.",
    parameters: z.object({
      name: z.string().regex(/^[a-z][a-z0-9_-]{0,31}$/).describe("Short thematic unique agent and tab name."),
      task: z.string().min(1).describe("Complete prompt to submit exactly once."),
    }),
    async execute(_id, params, _onUpdate, context) {
      const { name, task } = params as { name: string; task: string };
      return toolResponse(await spawnAgent({ cwd: context.cwd, name, task }, runner));
    },
  });

  pi.registerTool({
    name: "herdr_status",
    label: "Herdr Agent Status",
    description: "List live Herdr agents or inspect one agent by unique name or pane ID.",
    parameters: z.object({ target: z.string().min(1).optional() }),
    async execute(_id, params) {
      const { target } = params as { target?: string };
      return toolResponse(await getAgentStatus({ target }, runner));
    },
  });

  pi.registerTool({
    name: "herdr_read",
    label: "Read Herdr Agent",
    description: "Read terminal output from a Herdr agent by unique name or pane ID.",
    parameters: z.object({
      target: z.string().min(1),
      source: z.enum(["visible", "recent", "recent-unwrapped"]).optional(),
      lines: z.number().int().min(1).max(500).optional(),
    }),
    async execute(_id, params) {
      const { lines, source, target } = params as { lines?: number; source?: ReadSource; target: string };
      return toolResponse(await readAgent({ lines, source, target }, runner));
    },
  });

  pi.registerTool({
    name: "herdr_focus",
    label: "Focus Herdr Agent",
    description: "Focus an existing Herdr agent. This visibly changes the active Herdr tab and must be explicitly requested.",
    parameters: z.object({ target: z.string().min(1) }),
    async execute(_id, params) {
      const { target } = params as { target: string };
      return toolResponse(await focusAgent({ target }, runner));
    },
  });
}

export default function herdrAgentExtension(pi: ExtensionAPI) {
  registerHerdrAgentTools(pi, createHerdrRunner());
}
