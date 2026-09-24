export const AGENT_NAME_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;
export const READ_SOURCES = ["visible", "recent", "recent-unwrapped"] as const;

export type AgentStatus = "working" | "blocked" | "done" | "idle" | "unknown";
export type ReadSource = (typeof READ_SOURCES)[number];
export type Operation = "spawn" | "status" | "read" | "focus";
export type FailureStage = "input" | "preflight" | "tab" | "start" | "prompt" | "inspect" | "status" | "read" | "focus";

export interface AgentInfo {
  agent: string;
  agent_status: AgentStatus;
  cwd?: string;
  focused?: boolean;
  name?: string;
  pane_id: string;
  tab_id: string;
  workspace_id: string;
}

export interface PartialSpawn {
  agentName: string;
  paneId?: string;
  tabId?: string;
  workspaceId: string;
}

export interface OperationError {
  code: string;
  exitCode?: number;
  message: string;
}

export interface FailureResult {
  error: OperationError;
  inspection?: {
    agent?: AgentInfo;
    visibleOutput?: string;
  };
  ok: false;
  operation: Operation;
  partial?: PartialSpawn;
  stage: FailureStage;
}

export interface SpawnSuccess {
  agent: {
    kind: "omp";
    name: string;
    status: AgentStatus;
  };
  ok: true;
  operation: "spawn";
  prompt: { delivery: "submitted" };
  topology: {
    cwd: string;
    focused: false;
    paneId: string;
    tabId: string;
    workspaceId: string;
  };
}

export interface StatusSuccess {
  agents: AgentInfo[];
  ok: true;
  operation: "status";
}

export interface ReadSuccess {
  ok: true;
  operation: "read";
  output: string;
  source: ReadSource;
  target: string;
}

export interface FocusSuccess {
  agent: AgentInfo;
  ok: true;
  operation: "focus";
}

export type OperationResult = SpawnSuccess | StatusSuccess | ReadSuccess | FocusSuccess | FailureResult;

export interface SpawnInput {
  cwd?: string;
  name: string;
  task: string;
  workspace?: string;
}

export interface StatusInput { target?: string }
export interface ReadInput { lines?: number; source?: ReadSource; target: string }
export interface FocusInput { target: string }
