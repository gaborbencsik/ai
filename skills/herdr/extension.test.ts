import { describe, expect, test } from "bun:test";
import { registerHerdrAgentTools } from "./extension.ts";
import type { HerdrRunner } from "./herdr-client.ts";

function schema() {
  const chain = {
    describe() { return chain; },
    int() { return chain; },
    max() { return chain; },
    min() { return chain; },
    optional() { return chain; },
    regex() { return chain; },
  };
  return chain;
}

interface ToolDefinition {
  execute: (id: string, params: unknown, onUpdate?: unknown, context?: { cwd: string }) => Promise<{
    content: Array<{ text: string }>;
    details: unknown;
  }>;
}

function extensionHarness(responses: unknown[]): Record<string, ToolDefinition> {
  const tools: Record<string, ToolDefinition> = {};
  const runner: HerdrRunner = {
    async run() {
      const next = responses.shift();
      if (next instanceof Error) throw next;
      return next;
    },
  };
  const pi = {
    setLabel() {},
    zod: { enum: schema, number: schema, object: schema, string: schema },
    registerTool(tool: ToolDefinition & { name: string }) { tools[tool.name] = tool; },
  };
  registerHerdrAgentTools(pi as never, runner);
  return tools;
}

const agent = {
  agent: "omp", agent_status: "idle", cwd: "/repo", focused: false, name: "review-auth",
  pane_id: "w7:p2", tab_id: "w7:t2", workspace_id: "w7",
};

describe("Herdr extension tools", () => {
  test("register only the scoped surface", () => {
    expect(Object.keys(extensionHarness([]))).toEqual(["herdr_spawn", "herdr_status", "herdr_read", "herdr_focus"]);
  });

  test("route spawn, status, read, and focus through the shared core", async () => {
    const tools = extensionHarness([
      { result: { agents: [] } },
      { result: { tab: { tab_id: "w7:t2" }, root_pane: { pane_id: "w7:p2" } } },
      { result: { agent } },
      { result: { agent } },
      { result: { agents: [agent] } },
      "agent output",
      { result: { agent: { ...agent, focused: true } } },
    ]);
    const spawned = await tools.herdr_spawn.execute("1", { name: "review-auth", task: "Review" }, undefined, { cwd: process.cwd() });
    expect(spawned.details).toMatchObject({ ok: true, operation: "spawn", topology: { paneId: "w7:p2" } });
    expect((await tools.herdr_status.execute("2", {})).details).toMatchObject({ ok: true, agents: [{ name: "review-auth" }] });
    expect((await tools.herdr_read.execute("3", { target: "review-auth" })).details).toMatchObject({ ok: true, output: "agent output" });
    expect((await tools.herdr_focus.execute("4", { target: "review-auth" })).details).toMatchObject({ ok: true, agent: { focused: true } });
  });

  test("renders structured failures without throwing", async () => {
    const tools = extensionHarness([]);
    const response = await tools.herdr_spawn.execute("1", { name: "review-auth", task: "Review" }, undefined, { cwd: process.cwd() });
    expect(response.details).toMatchObject({ ok: false, stage: "preflight" });
    expect(response.content[0].text).toContain("failed at preflight");
  });
});
