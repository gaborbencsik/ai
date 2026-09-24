import { execFile } from "node:child_process";

const MAX_OUTPUT_BYTES = 4 * 1024 * 1024;

export interface HerdrRunner {
  run(args: readonly string[], output?: "json" | "text"): Promise<unknown>;
}

export class HerdrCommandError extends Error {
  readonly code: string;
  readonly exitCode?: number;
  readonly stderr: string;

  constructor(message: string, options: { code?: string; exitCode?: number; stderr?: string } = {}) {
    super(message);
    this.name = "HerdrCommandError";
    this.code = options.code ?? "herdr_command_failed";
    this.exitCode = options.exitCode;
    this.stderr = options.stderr ?? "";
  }
}

function parseJson(text: string, stream: "stdout" | "stderr"): unknown {
  try {
    return JSON.parse(text);
  } catch {
    throw new HerdrCommandError(`Herdr returned invalid JSON on ${stream}.`, {
      code: "invalid_herdr_json",
      stderr: stream === "stderr" ? text : undefined,
    });
  }
}

function errorFromStderr(stderr: string, exitCode?: number): HerdrCommandError {
  if (stderr.trim()) {
    try {
      const parsed = JSON.parse(stderr) as { error?: { code?: unknown; message?: unknown } };
      if (parsed.error && typeof parsed.error.message === "string") {
        return new HerdrCommandError(parsed.error.message, {
          code: typeof parsed.error.code === "string" ? parsed.error.code : undefined,
          exitCode,
          stderr,
        });
      }
    } catch {
      // Preserve non-JSON diagnostics below.
    }
  }
  return new HerdrCommandError(stderr.trim() || `Herdr exited with code ${exitCode ?? "unknown"}.`, {
    exitCode,
    stderr,
  });
}

export function createHerdrRunner(binary = "herdr"): HerdrRunner {
  return {
    run(args, output = "json") {
      const { promise, reject, resolve } = Promise.withResolvers<unknown>();
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
    },
  };
}
