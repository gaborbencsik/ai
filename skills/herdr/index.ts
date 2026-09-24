import { Command, CommanderError } from "commander";
import type { OperationResult, ReadSource } from "./contracts.ts";
import { createHerdrRunner } from "./herdr-client.ts";
import { focusAgent, getAgentStatus, readAgent, spawnAgent } from "./operations.ts";

const runner = createHerdrRunner();
const program = new Command()
  .name("herdr-agent")
  .description("Deterministic OMP agent orchestration through the installed Herdr CLI.")
  .exitOverride()
  .showHelpAfterError();

function writeResult(result: OperationResult): void {
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.ok) process.exitCode = result.stage === "input" ? 2 : result.partial?.tabId ? 4 : 3;
}

program
  .command("spawn")
  .requiredOption("--name <name>", "Unique live agent name")
  .requiredOption("--task <task>", "Prompt to submit exactly once")
  .option("--cwd <path>", "Working directory")
  .option("--workspace <id>", "Herdr workspace ID")
  .action(async (options: { cwd?: string; name: string; task: string; workspace?: string }) => {
    writeResult(await spawnAgent(options, runner));
  });

program
  .command("status")
  .argument("[target]", "Agent name or pane ID")
  .action(async (target?: string) => {
    writeResult(await getAgentStatus({ target }, runner));
  });

program
  .command("read")
  .argument("<target>", "Agent name or pane ID")
  .option("--source <source>", "visible, recent, or recent-unwrapped", "recent-unwrapped")
  .option("--lines <count>", "Number of lines", "120")
  .action(async (target: string, options: { lines: string; source: string }) => {
    writeResult(await readAgent({ lines: Number(options.lines), source: options.source as ReadSource, target }, runner));
  });

program
  .command("focus")
  .argument("<target>", "Agent name or pane ID")
  .action(async (target: string) => {
    writeResult(await focusAgent({ target }, runner));
  });

try {
  await program.parseAsync();
} catch (error) {
  if (error instanceof CommanderError) {
    process.stdout.write(`${JSON.stringify({
      error: { code: "invalid_cli_input", message: error.message },
      ok: false,
      operation: "status",
      stage: "input",
    })}\n`);
    process.exitCode = 2;
  } else {
    throw error;
  }
}
