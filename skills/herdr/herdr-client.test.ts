import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { chmod, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createHerdrRunner, HerdrCommandError } from "./herdr-client.ts";

let directory = "";
let executable = "";

beforeAll(async () => {
  directory = await mkdtemp(join(tmpdir(), "herdr-runner-"));
  executable = join(directory, "fake-herdr");
  await writeFile(executable, `#!/usr/bin/env bun
const mode = process.argv[2];
if (mode === "json") console.log(JSON.stringify({ result: { ok: true } }));
else if (mode === "text") process.stdout.write("raw terminal output\\n");
else if (mode === "invalid") process.stdout.write("not-json");
else if (mode === "json-error") { process.stderr.write(JSON.stringify({ error: { code: "agent_not_found", message: "missing" } })); process.exit(1); }
else if (mode === "plain-error") { process.stderr.write("plain failure"); process.exit(2); }
`);
  await chmod(executable, 0o755);
});

afterAll(async () => {
  await rm(directory, { force: true, recursive: true });
});

describe("createHerdrRunner", () => {
  test("returns parsed JSON and raw text without a shell", async () => {
    const runner = createHerdrRunner(executable);
    expect(await runner.run(["json"])).toEqual({ result: { ok: true } });
    expect(await runner.run(["text"], "text")).toBe("raw terminal output\n");
  });

  test("fails closed for invalid or empty JSON responses", async () => {
    const runner = createHerdrRunner(executable);
    await expect(runner.run(["invalid"])).rejects.toMatchObject({ code: "invalid_herdr_json" });
    await expect(runner.run(["empty"])).rejects.toMatchObject({ code: "empty_herdr_response" });
  });

  test("preserves structured and plain Herdr failures", async () => {
    const runner = createHerdrRunner(executable);
    await expect(runner.run(["json-error"])).rejects.toMatchObject({ code: "agent_not_found", exitCode: 1, message: "missing" });
    await expect(runner.run(["plain-error"])).rejects.toMatchObject({ code: "herdr_command_failed", exitCode: 2, message: "plain failure" });
  });

  test("uses stable defaults for explicit command errors", () => {
    expect(new HerdrCommandError("failed")).toMatchObject({ code: "herdr_command_failed", stderr: "" });
  });
});
