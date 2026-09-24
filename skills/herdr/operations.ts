import { stat } from "node:fs/promises";
import {
  AGENT_NAME_PATTERN,
  READ_SOURCES,
  type AgentInfo,
  type FailureResult,
  type FailureStage,
  type FocusInput,
  type FocusSuccess,
  type Operation,
  type OperationResult,
  type PartialSpawn,
  type ReadInput,
  type ReadSuccess,
  type SpawnInput,
  type SpawnSuccess,
  type StatusInput,
  type StatusSuccess,
} from "./contracts.ts";
import { HerdrCommandError, type HerdrRunner } from "./herdr-client.ts";

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`Herdr response is missing ${label}.`);
  return value as Record<string, unknown>;
}

function stringField(value: Record<string, unknown>, key: string): string {
  if (typeof value[key] !== "string" || value[key] === "") throw new Error(`Herdr response is missing ${key}.`);
  return value[key] as string;
}

function agentInfo(value: unknown): AgentInfo {
  const agent = record(value, "agent");
  const status = stringField(agent, "agent_status");
  if (!["working", "blocked", "done", "idle", "unknown"].includes(status)) throw new Error(`Unsupported agent status: ${status}.`);
  return {
    agent: stringField(agent, "agent"),
    agent_status: status as AgentInfo["agent_status"],
    cwd: typeof agent.cwd === "string" ? agent.cwd : undefined,
    focused: typeof agent.focused === "boolean" ? agent.focused : undefined,
    name: typeof agent.name === "string" ? agent.name : undefined,
    pane_id: stringField(agent, "pane_id"),
    tab_id: stringField(agent, "tab_id"),
    workspace_id: stringField(agent, "workspace_id"),
  };
}

function resultRecord(response: unknown): Record<string, unknown> {
  return record(record(response, "response").result, "result");
}

function failure(operation: Operation, stage: FailureStage, error: unknown, partial?: PartialSpawn): FailureResult {
  const commandError = error instanceof HerdrCommandError ? error : undefined;
  return {
    error: {
      code: commandError?.code ?? (error instanceof Error && error.message.startsWith("Herdr response") ? "invalid_herdr_response" : "operation_failed"),
      exitCode: commandError?.exitCode,
      message: error instanceof Error ? error.message : String(error),
    },
    ok: false,
    operation,
    partial,
    stage,
  };
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} must not be empty.`);
  return trimmed;
}

export async function spawnAgent(input: SpawnInput, runner: HerdrRunner, env: NodeJS.ProcessEnv = process.env): Promise<OperationResult> {
  let name: string;
  let task: string;
  let cwd: string;
  let workspaceId: string;
  try {
    if (env.HERDR_ENV !== "1") throw new Error("HERDR_ENV=1 is required.");
    name = nonEmpty(input.name, "name");
    if (!AGENT_NAME_PATTERN.test(name)) throw new Error("name must match [a-z][a-z0-9_-]{0,31}.");
    task = nonEmpty(input.task, "task");
    cwd = input.cwd ?? process.cwd();
    const cwdStat = await stat(cwd);
    if (!cwdStat.isDirectory()) throw new Error("cwd must be a directory.");
    workspaceId = nonEmpty(input.workspace ?? env.HERDR_WORKSPACE_ID ?? "", "workspace");
  } catch (error) {
    return failure("spawn", "input", error);
  }

  const partial: PartialSpawn = { agentName: name, workspaceId };
  try {
    const list = resultRecord(await runner.run(["agent", "list"]));
    const agents = list.agents;
    if (!Array.isArray(agents)) throw new Error("Herdr response is missing agents.");
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

  let started: AgentInfo;
  try {
    const response = resultRecord(await runner.run(["agent", "start", name, "--kind", "omp", "--pane", partial.paneId!]));
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
    } catch { /* Best-effort diagnosis; original failure remains authoritative. */ }
    try {
      const output = await runner.run(["agent", "read", name, "--source", "visible"], "text");
      if (typeof output === "string") failed.inspection.visibleOutput = output;
    } catch { /* Best-effort diagnosis; never retry prompt. */ }
    return failed;
  }

  const success: SpawnSuccess = {
    agent: { kind: "omp", name, status: started.agent_status },
    ok: true,
    operation: "spawn",
    prompt: { delivery: "submitted" },
    topology: { cwd, focused: false, paneId: partial.paneId!, tabId: partial.tabId!, workspaceId },
  };
  return success;
}

export async function getAgentStatus(input: StatusInput, runner: HerdrRunner): Promise<StatusSuccess | FailureResult> {
  try {
    const response = resultRecord(await runner.run(input.target ? ["agent", "get", nonEmpty(input.target, "target")] : ["agent", "list"]));
    const agents = input.target ? [agentInfo(response.agent)] : (() => {
      if (!Array.isArray(response.agents)) throw new Error("Herdr response is missing agents.");
      return response.agents.map(agentInfo);
    })();
    return { agents, ok: true, operation: "status" };
  } catch (error) {
    return failure("status", "status", error);
  }
}

export async function readAgent(input: ReadInput, runner: HerdrRunner): Promise<ReadSuccess | FailureResult> {
  try {
    const target = nonEmpty(input.target, "target");
    const source = input.source ?? "recent-unwrapped";
    if (!READ_SOURCES.includes(source)) throw new Error("source is invalid.");
    const lines = input.lines ?? 120;
    if (!Number.isInteger(lines) || lines < 1 || lines > 500) throw new Error("lines must be an integer from 1 to 500.");
    const output = await runner.run(["agent", "read", target, "--source", source, "--lines", String(lines)], "text");
    if (typeof output !== "string") throw new Error("Herdr read response is not text.");
    return { ok: true, operation: "read", output, source, target };
  } catch (error) {
    return failure("read", "read", error);
  }
}

export async function focusAgent(input: FocusInput, runner: HerdrRunner): Promise<FocusSuccess | FailureResult> {
  try {
    const target = nonEmpty(input.target, "target");
    const response = resultRecord(await runner.run(["agent", "focus", target]));
    return { agent: agentInfo(response.agent), ok: true, operation: "focus" };
  } catch (error) {
    return failure("focus", "focus", error);
  }
}
