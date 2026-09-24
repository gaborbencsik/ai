import { describe, expect, test } from "bun:test";
import type { HerdrRunner } from "./herdr-client.ts";
import { focusAgent, getAgentStatus, readAgent, spawnAgent } from "./operations.ts";

const info = (name = "review-auth", status = "idle") => ({
  agent: "omp", agent_status: status, cwd: process.cwd(), focused: false, name,
  pane_id: "w7:p16", tab_id: "w7:t3", workspace_id: "w7",
});

function fake(responses: unknown[]): HerdrRunner & { calls: readonly string[][] } {
  const calls: string[][] = [];
  return {
    calls,
    async run(args) {
      calls.push([...args]);
      const next = responses.shift();
      if (next instanceof Error) throw next;
      return next;
    },
  };
}

const env = { HERDR_ENV: "1", HERDR_WORKSPACE_ID: "w7" };

describe("spawnAgent", () => {
  test("executes the mutation protocol once in order using returned IDs", async () => {
    const runner = fake([
      { result: { agents: [] } },
      { result: { tab: { tab_id: "w7:t3" }, root_pane: { pane_id: "w7:p16" } } },
      { result: { agent: info() } },
      { result: { agent: info("review-auth", "working") } },
    ]);
    const result = await spawnAgent({ name: "review-auth", task: "Review auth", cwd: process.cwd() }, runner, env);
    expect(result.ok).toBe(true);
    expect(runner.calls).toEqual([
      ["agent", "list"],
      ["tab", "create", "--workspace", "w7", "--cwd", process.cwd(), "--label", "review-auth", "--no-focus"],
      ["agent", "start", "review-auth", "--kind", "omp", "--pane", "w7:p16"],
      ["agent", "prompt", "review-auth", "Review auth"],
    ]);
  });

  test("rejects a live name before mutation", async () => {
    const runner = fake([{ result: { agents: [info()] } }]);
    const result = await spawnAgent({ name: "review-auth", task: "Review auth", cwd: process.cwd() }, runner, env);
    expect(result).toMatchObject({ ok: false, stage: "preflight", error: { code: "name_conflict" } });
    expect(runner.calls).toHaveLength(1);
  });

  test("does not prompt when agent start fails", async () => {
    const runner = fake([
      { result: { agents: [] } },
      { result: { tab: { tab_id: "w7:t3" }, root_pane: { pane_id: "w7:p16" } } },
      new Error("start failed"),
    ]);
    const result = await spawnAgent({ name: "review-auth", task: "Review auth", cwd: process.cwd() }, runner, env);
    expect(result).toMatchObject({ ok: false, stage: "start", partial: { tabId: "w7:t3", paneId: "w7:p16" } });
    expect(runner.calls.filter((call) => call[1] === "prompt")).toHaveLength(0);
  });

  test("inspects but never retries after ambiguous prompt failure", async () => {
    const runner = fake([
      { result: { agents: [] } },
      { result: { tab: { tab_id: "w7:t3" }, root_pane: { pane_id: "w7:p16" } } },
      { result: { agent: info() } },
      new Error("timeout"),
      { result: { agent: info("review-auth", "working") } },
      "Working on it",
    ]);
    const result = await spawnAgent({ name: "review-auth", task: "Review auth", cwd: process.cwd() }, runner, env);
    expect(result).toMatchObject({ ok: false, stage: "prompt", error: { code: "prompt_delivery_unknown" }, inspection: { visibleOutput: "Working on it" } });
    expect(runner.calls.filter((call) => call[1] === "prompt")).toHaveLength(1);
    expect(runner.calls.slice(-2)).toEqual([["agent", "get", "review-auth"], ["agent", "read", "review-auth", "--source", "visible"]]);
  });
});


  test("reports malformed preflight and tab responses without later mutation", async () => {
    const malformedList = fake([{ result: {} }]);
    expect(await spawnAgent({ name: "review-auth", task: "Review", cwd: process.cwd() }, malformedList, env))
      .toMatchObject({ ok: false, stage: "preflight", error: { code: "invalid_herdr_response" } });

    const malformedTab = fake([{ result: { agents: [] } }, { result: { tab: {}, root_pane: {} } }]);
    expect(await spawnAgent({ name: "review-auth", task: "Review", cwd: process.cwd() }, malformedTab, env))
      .toMatchObject({ ok: false, stage: "tab" });
    expect(malformedTab.calls).toHaveLength(2);
  });

  test("rejects missing Herdr context and empty task before calling Herdr", async () => {
    const outside = fake([]);
    expect(await spawnAgent({ name: "review-auth", task: "Review", cwd: process.cwd() }, outside, {}))
      .toMatchObject({ ok: false, stage: "input" });
    const emptyTask = fake([]);
    expect(await spawnAgent({ name: "review-auth", task: "  ", cwd: process.cwd() }, emptyTask, env))
      .toMatchObject({ ok: false, stage: "input" });
    expect(outside.calls).toHaveLength(0);
    expect(emptyTask.calls).toHaveLength(0);
  });
describe("inspection operations", () => {
  test("normalizes status, output, and focus", async () => {
    const runner = fake([
      { result: { agents: [info()] } },
      "result",
      { result: { agent: { ...info(), focused: true } } },
    ]);
    expect(await getAgentStatus({}, runner)).toMatchObject({ ok: true, agents: [{ name: "review-auth" }] });
    expect(await readAgent({ target: "review-auth" }, runner)).toMatchObject({ ok: true, output: "result" });
    expect(await focusAgent({ target: "review-auth" }, runner)).toMatchObject({ ok: true, agent: { focused: true } });
  });
});


  test("returns failures for invalid read boundaries and missing targets", async () => {
    const runner = fake([]);
    expect(await readAgent({ target: "", lines: 120 }, runner)).toMatchObject({ ok: false, stage: "read" });
    expect(await readAgent({ target: "review-auth", lines: 501 }, runner)).toMatchObject({ ok: false, stage: "read" });
    expect(await focusAgent({ target: "" }, runner)).toMatchObject({ ok: false, stage: "focus" });
    expect(runner.calls).toHaveLength(0);
  });

  test("preserves Herdr lookup failures", async () => {
    const runner = fake([new Error("missing")]);
    expect(await getAgentStatus({ target: "missing" }, runner)).toMatchObject({ ok: false, stage: "status", error: { message: "missing" } });
  });