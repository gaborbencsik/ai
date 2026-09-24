// @bun
// herdr-client.ts
import { execFile } from "child_process";
var MAX_OUTPUT_BYTES = 4 * 1024 * 1024;

class HerdrCommandError extends Error {
  code;
  exitCode;
  stderr;
  constructor(message, options = {}) {
    super(message);
    this.name = "HerdrCommandError";
    this.code = options.code ?? "herdr_command_failed";
    this.exitCode = options.exitCode;
    this.stderr = options.stderr ?? "";
  }
}
function parseJson(text, stream) {
  try {
    return JSON.parse(text);
  } catch {
    throw new HerdrCommandError(`Herdr returned invalid JSON on ${stream}.`, {
      code: "invalid_herdr_json",
      stderr: stream === "stderr" ? text : undefined
    });
  }
}
function errorFromStderr(stderr, exitCode) {
  if (stderr.trim()) {
    try {
      const parsed = JSON.parse(stderr);
      if (parsed.error && typeof parsed.error.message === "string") {
        return new HerdrCommandError(parsed.error.message, {
          code: typeof parsed.error.code === "string" ? parsed.error.code : undefined,
          exitCode,
          stderr
        });
      }
    } catch {}
  }
  return new HerdrCommandError(stderr.trim() || `Herdr exited with code ${exitCode ?? "unknown"}.`, {
    exitCode,
    stderr
  });
}
function createHerdrRunner(binary = "herdr") {
  return {
    run(args, output = "json") {
      const { promise, reject, resolve } = Promise.withResolvers();
      execFile(binary, [...args], { encoding: "utf8", maxBuffer: MAX_OUTPUT_BYTES }, (error, stdout, stderr) => {
        if (error) {
          const exitCode = typeof error.code === "number" ? error.code : undefined;
          reject(errorFromStderr(stderr, exitCode));
          return;
        }
        if (output === "text") {
          resolve(stdout);
          return;
        }
        if (!stdout.trim()) {
          reject(new HerdrCommandError("Herdr returned an empty response.", { code: "empty_herdr_response" }));
          return;
        }
        try {
          resolve(parseJson(stdout, "stdout"));
        } catch (parseError) {
          reject(parseError);
        }
      });
      return promise;
    }
  };
}

// operations.ts
import { stat } from "fs/promises";

// contracts.ts
var AGENT_NAME_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;
var READ_SOURCES = ["visible", "recent", "recent-unwrapped"];

// operations.ts
function record(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`Herdr response is missing ${label}.`);
  return value;
}
function stringField(value, key) {
  if (typeof value[key] !== "string" || value[key] === "")
    throw new Error(`Herdr response is missing ${key}.`);
  return value[key];
}
function agentInfo(value) {
  const agent = record(value, "agent");
  const status = stringField(agent, "agent_status");
  if (!["working", "blocked", "done", "idle", "unknown"].includes(status))
    throw new Error(`Unsupported agent status: ${status}.`);
  return {
    agent: stringField(agent, "agent"),
    agent_status: status,
    cwd: typeof agent.cwd === "string" ? agent.cwd : undefined,
    focused: typeof agent.focused === "boolean" ? agent.focused : undefined,
    name: typeof agent.name === "string" ? agent.name : undefined,
    pane_id: stringField(agent, "pane_id"),
    tab_id: stringField(agent, "tab_id"),
    workspace_id: stringField(agent, "workspace_id")
  };
}
function resultRecord(response) {
  return record(record(response, "response").result, "result");
}
function failure(operation, stage, error, partial) {
  const commandError = error instanceof HerdrCommandError ? error : undefined;
  return {
    error: {
      code: commandError?.code ?? (error instanceof Error && error.message.startsWith("Herdr response") ? "invalid_herdr_response" : "operation_failed"),
      exitCode: commandError?.exitCode,
      message: error instanceof Error ? error.message : String(error)
    },
    ok: false,
    operation,
    partial,
    stage
  };
}
function nonEmpty(value, label) {
  const trimmed = value.trim();
  if (!trimmed)
    throw new Error(`${label} must not be empty.`);
  return trimmed;
}
async function spawnAgent(input, runner, env = process.env) {
  let name;
  let task;
  let cwd;
  let workspaceId;
  try {
    if (env.HERDR_ENV !== "1")
      throw new Error("HERDR_ENV=1 is required.");
    name = nonEmpty(input.name, "name");
    if (!AGENT_NAME_PATTERN.test(name))
      throw new Error("name must match [a-z][a-z0-9_-]{0,31}.");
    task = nonEmpty(input.task, "task");
    cwd = input.cwd ?? process.cwd();
    const cwdStat = await stat(cwd);
    if (!cwdStat.isDirectory())
      throw new Error("cwd must be a directory.");
    workspaceId = nonEmpty(input.workspace ?? env.HERDR_WORKSPACE_ID ?? "", "workspace");
  } catch (error) {
    return failure("spawn", "input", error);
  }
  const partial = { agentName: name, workspaceId };
  try {
    const list = resultRecord(await runner.run(["agent", "list"]));
    const agents = list.agents;
    if (!Array.isArray(agents))
      throw new Error("Herdr response is missing agents.");
    if (agents.some((item) => record(item, "agent").name === name)) {
      return failure("spawn", "preflight", new HerdrCommandError(`Agent name ${name} is already live.`, { code: "name_conflict" }), partial);
    }
  } catch (error) {
    return failure("spawn", "preflight", error, partial);
  }
  try {
    const created = resultRecord(await runner.run(["tab", "create", "--workspace", workspaceId, "--cwd", cwd, "--label", name, "--no-focus"]));
    partial.tabId = stringField(record(created.tab, "tab"), "tab_id");
    partial.paneId = stringField(record(created.root_pane, "root_pane"), "pane_id");
  } catch (error) {
    return failure("spawn", "tab", error, partial);
  }
  let started;
  try {
    const response = resultRecord(await runner.run(["agent", "start", name, "--kind", "omp", "--pane", partial.paneId]));
    started = agentInfo(response.agent);
  } catch (error) {
    return failure("spawn", "start", error, partial);
  }
  try {
    await runner.run(["agent", "prompt", name, task]);
  } catch (error) {
    const failed = failure("spawn", "prompt", error, partial);
    failed.error.code = "prompt_delivery_unknown";
    failed.inspection = {};
    try {
      const inspected = resultRecord(await runner.run(["agent", "get", name]));
      failed.inspection.agent = agentInfo(inspected.agent);
    } catch {}
    try {
      const output = await runner.run(["agent", "read", name, "--source", "visible"], "text");
      if (typeof output === "string")
        failed.inspection.visibleOutput = output;
    } catch {}
    return failed;
  }
  const success = {
    agent: { kind: "omp", name, status: started.agent_status },
    ok: true,
    operation: "spawn",
    prompt: { delivery: "submitted" },
    topology: { cwd, focused: false, paneId: partial.paneId, tabId: partial.tabId, workspaceId }
  };
  return success;
}
async function getAgentStatus(input, runner) {
  try {
    const response = resultRecord(await runner.run(input.target ? ["agent", "get", nonEmpty(input.target, "target")] : ["agent", "list"]));
    const agents = input.target ? [agentInfo(response.agent)] : (() => {
      if (!Array.isArray(response.agents))
        throw new Error("Herdr response is missing agents.");
      return response.agents.map(agentInfo);
    })();
    return { agents, ok: true, operation: "status" };
  } catch (error) {
    return failure("status", "status", error);
  }
}
async function readAgent(input, runner) {
  try {
    const target = nonEmpty(input.target, "target");
    const source = input.source ?? "recent-unwrapped";
    if (!READ_SOURCES.includes(source))
      throw new Error("source is invalid.");
    const lines = input.lines ?? 120;
    if (!Number.isInteger(lines) || lines < 1 || lines > 500)
      throw new Error("lines must be an integer from 1 to 500.");
    const output = await runner.run(["agent", "read", target, "--source", source, "--lines", String(lines)], "text");
    if (typeof output !== "string")
      throw new Error("Herdr read response is not text.");
    return { ok: true, operation: "read", output, source, target };
  } catch (error) {
    return failure("read", "read", error);
  }
}
async function focusAgent(input, runner) {
  try {
    const target = nonEmpty(input.target, "target");
    const response = resultRecord(await runner.run(["agent", "focus", target]));
    return { agent: agentInfo(response.agent), ok: true, operation: "focus" };
  } catch (error) {
    return failure("focus", "focus", error);
  }
}

// extension.ts
function toolResponse(result) {
  const text = result.ok ? result.operation === "spawn" ? `Started ${result.agent.name} in background tab ${result.topology.tabId}, pane ${result.topology.paneId}; prompt submitted once.` : result.operation === "status" ? `Herdr status returned ${result.agents.length} agent(s).` : result.operation === "read" ? result.output : `Focused ${result.agent.name ?? result.agent.pane_id}.` : `Herdr ${result.operation} failed at ${result.stage}: ${result.error.code}: ${result.error.message}`;
  return { content: [{ type: "text", text }], details: result };
}
function registerHerdrAgentTools(pi, runner) {
  pi.setLabel("Herdr Agent");
  const z = pi.zod;
  pi.registerTool({
    name: "herdr_spawn",
    label: "Spawn Herdr Agent",
    description: "Start one OMP agent in a new background Herdr tab in the current workspace and cwd, then submit the prompt exactly once. Use for explicit requests to run a prompt in a new Herdr tab.",
    parameters: z.object({
      name: z.string().regex(/^[a-z][a-z0-9_-]{0,31}$/).describe("Short thematic unique agent and tab name."),
      task: z.string().min(1).describe("Complete prompt to submit exactly once.")
    }),
    async execute(_id, params, _onUpdate, context) {
      const { name, task } = params;
      return toolResponse(await spawnAgent({ cwd: context.cwd, name, task }, runner));
    }
  });
  pi.registerTool({
    name: "herdr_status",
    label: "Herdr Agent Status",
    description: "List live Herdr agents or inspect one agent by unique name or pane ID.",
    parameters: z.object({ target: z.string().min(1).optional() }),
    async execute(_id, params) {
      const { target } = params;
      return toolResponse(await getAgentStatus({ target }, runner));
    }
  });
  pi.registerTool({
    name: "herdr_read",
    label: "Read Herdr Agent",
    description: "Read terminal output from a Herdr agent by unique name or pane ID.",
    parameters: z.object({
      target: z.string().min(1),
      source: z.enum(["visible", "recent", "recent-unwrapped"]).optional(),
      lines: z.number().int().min(1).max(500).optional()
    }),
    async execute(_id, params) {
      const { lines, source, target } = params;
      return toolResponse(await readAgent({ lines, source, target }, runner));
    }
  });
  pi.registerTool({
    name: "herdr_focus",
    label: "Focus Herdr Agent",
    description: "Focus an existing Herdr agent. This visibly changes the active Herdr tab and must be explicitly requested.",
    parameters: z.object({ target: z.string().min(1) }),
    async execute(_id, params) {
      const { target } = params;
      return toolResponse(await focusAgent({ target }, runner));
    }
  });
}
function herdrAgentExtension(pi) {
  registerHerdrAgentTools(pi, createHerdrRunner());
}
export {
  herdrAgentExtension as default,
  registerHerdrAgentTools
};
