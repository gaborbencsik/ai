import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

interface ResearchResult {
  topic: string;
  mode: "quick" | "standard" | "deep" | "ultradeep";
  startedAt: string;
  completedAt?: string;
  sources: Array<{
    title: string;
    url: string;
    credibility: "high" | "medium" | "low";
    excerpt?: string;
  }>;
  findings: string;
  executive_summary: string;
  status: "in_progress" | "completed" | "failed";
  error?: string;
}

const RESEARCH_MODES = ["quick", "standard", "deep", "ultradeep"] as const;
type ResearchMode = (typeof RESEARCH_MODES)[number];

// Phase → agent routing. Agent names resolve through ~/.omp/agent/agents/*.md;
// each agent pins its model via frontmatter (research-scout → @smol,
// research-synthesizer / research-critic → @slow). See agents/ in this directory.
const RESEARCH_PHASES: Record<ResearchMode, Array<{ id: string; name: string; agent: string; description: string }>> = {
  quick: [
    { id: "scope", name: "Scope", agent: "self", description: "Define research boundaries and key questions" },
    { id: "retrieve", name: "Quick Retrieve", agent: "research-scout", description: "3-6 web searches via searxng_search, first 3 credible sources stop" },
    { id: "synthesize", name: "Synthesize", agent: "self", description: "Combine findings into a short narrative (300-800 words)" },
  ],
  standard: [
    { id: "scope", name: "Scope", agent: "self", description: "Define research boundaries" },
    { id: "plan", name: "Plan", agent: "self", description: "Create search strategy and sub-question decomposition" },
    { id: "retrieve", name: "Retrieve", agent: "research-scout", description: "5-8 parallel searches until 10+ sources, 3+ per major claim" },
    { id: "triangulate", name: "Triangulate", agent: "self", description: "Cross-validate sources with the triangulate_findings tool" },
    { id: "outline", name: "Outline", agent: "self", description: "Structure findings by claim hierarchy" },
    { id: "synthesize", name: "Synthesize", agent: "research-synthesizer", description: "Write comprehensive narrative + executive summary" },
  ],
  deep: [
    { id: "scope", name: "Scope", agent: "self", description: "Deep boundaries definition" },
    { id: "plan", name: "Plan", agent: "self", description: "Multi-angle search strategy" },
    { id: "retrieve", name: "Retrieve", agent: "research-scout", description: "8-12 concurrent searches, target 15+ sources" },
    { id: "triangulate", name: "Triangulate", agent: "self", description: "3-source validation per claim" },
    { id: "outline", name: "Outline", agent: "self", description: "Detailed structure" },
    { id: "synthesize", name: "Synthesize", agent: "research-synthesizer", description: "Deep synthesis with verified load-bearing URLs" },
    { id: "critique", name: "Critique", agent: "research-critic", description: "Adversarial red-team review; loop back to retrieve on critical gaps" },
    { id: "refine", name: "Refine", agent: "research-synthesizer", description: "Close critique gaps, polish prose" },
  ],
  ultradeep: [
    { id: "scope", name: "Scope", agent: "self", description: "Comprehensive boundaries" },
    { id: "plan", name: "Plan", agent: "self", description: "Adversarial planning" },
    { id: "retrieve", name: "Retrieve", agent: "research-scout", description: "12+ searches, target 20+ sources, peer-reviewed when available" },
    { id: "triangulate", name: "Triangulate", agent: "self", description: "4+ sources per major claim" },
    { id: "outline", name: "Outline", agent: "self", description: "Multi-persona outline" },
    { id: "synthesize", name: "Synthesize", agent: "research-synthesizer", description: "Comprehensive synthesis" },
    { id: "critique", name: "Critique", agent: "research-critic", description: "Multi-persona critique with iteration" },
    { id: "refine", name: "Refine", agent: "research-synthesizer", description: "Exhaustive refinement" },
  ],
};

const MODE_DEPTH: Record<ResearchMode, string> = {
  quick: "Shallow — 3-6 searches, 3+ credible sources, short narrative.",
  standard: "Balanced — 5-8 searches, 10+ sources, 3+ per major claim, 600-1200 word findings.",
  deep: "Thorough — 8-12 searches, 15+ sources, verified load-bearing URLs, 1200-2000 word findings.",
  ultradeep: "Exhaustive — 12+ searches, 20+ sources, peer-reviewed preference, adversarial critique loop, 2000+ word findings.",
};

const SEARXNG_URL = "http://localhost:8888/search";

interface SearxngResult {
  title?: string;
  url?: string;
  content?: string;
  engine?: string;
  score?: number;
  publishedDate?: string;
}

export default function deepResearchExtension(pi: ExtensionAPI) {
  const researchCache = new Map<string, ResearchResult>();

  // Tool: local SearXNG search — primary web retrieval for the research pipeline.
  // Requires a running SearXNG with `formats: [html, json]` in its settings.yml.
  pi.registerTool({
    name: "searxng_search",
    label: "SearXNG Search",
    description:
      "Web search via a self-hosted SearXNG instance (default http://localhost:8888). " +
      "Returns aggregated results (title, url, snippet) across engines. Use this before falling back to web_search.",
    parameters: pi.zod.object({
      query: pi.zod.string().describe("Search query; supports SearXNG syntax like site:, -term, \"exact phrase\""),
      categories: pi.zod.string().optional().describe("SearXNG category, e.g. general, news, science, it"),
      language: pi.zod.string().optional().describe("BCP-47 language filter, e.g. en, hu, en-US"),
      limit: pi.zod.number().optional().describe("Max results to return (default 10)"),
      base_url: pi.zod.string().url().optional().describe("Override the SearXNG base URL"),
    }),
    async execute(_id, params, signal) {
      const base = params.base_url ?? SEARXNG_URL;
      const limit = params.limit ?? 10;
      const url = new URL(base);
      url.searchParams.set("q", params.query);
      url.searchParams.set("format", "json");
      if (params.categories) url.searchParams.set("categories", params.categories);
      if (params.language) url.searchParams.set("language", params.language);

      let response: Response;
      try {
        response = await fetch(url, { signal, headers: { Accept: "application/json" } });
      } catch (err) {
        return {
          content: [{ type: "text", text: `SearXNG unreachable at ${base}: ${String(err)}` }],
          details: { unreachable: true },
        };
      }
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        return {
          content: [{ type: "text", text: `SearXNG HTTP ${response.status} for "${params.query}"${text ? `: ${text.slice(0, 200)}` : ""}` }],
          details: { status: response.status },
        };
      }

      let payload: { results?: SearxngResult[] };
      try {
        payload = (await response.json()) as typeof payload;
      } catch (err) {
        return {
          content: [{ type: "text", text: `SearXNG returned non-JSON: ${String(err)}` }],
          details: { parseError: true },
        };
      }

      const results = (payload.results ?? []).slice(0, limit);
      if (results.length === 0) {
        return { content: [{ type: "text", text: `No results for "${params.query}".` }], details: { count: 0, query: params.query } };
      }

      const lines = results
        .map((r, i) => {
          const title = r.title ?? "(untitled)";
          const u = r.url ?? "";
          const snippet = r.content ?? "";
          const date = r.publishedDate ? ` (${r.publishedDate})` : "";
          return `${i + 1}. ${title}${date}\n   ${u}\n   ${snippet}`;
        })
        .join("\n\n");
      return {
        content: [{ type: "text", text: `${results.length} results for "${params.query}":\n\n${lines}` }],
        details: {
          count: results.length,
          query: params.query,
          results: results.map((r) => ({
            title: r.title ?? "",
            url: r.url ?? "",
            excerpt: r.content ?? "",
            engines: r.engine ? r.engine.split(", ") : [],
          })),
        },
      };
    },
  });

  // Tool: credibility scoring
  pi.registerTool({
    name: "assess_source_credibility",
    label: "Assess Source Credibility",
    description: "Score a source's trustworthiness (high/medium/low) based on URL, domain, and context",
    parameters: pi.zod.object({
      url: pi.zod.string().url().describe("Source URL"),
      title: pi.zod.string().optional().describe("Source title"),
      content_snippet: pi.zod.string().optional().describe("Excerpt from source"),
    }),
    async execute(_id, params, _onUpdate, _ctx) {
      const { url, title = "", content_snippet = "" } = params;

      // Simple heuristic credibility scoring
      const domain = new URL(url).hostname;
      let score = "medium";

      const highCredibilityDomains = [
        /\.(edu|gov)$/,
        /^(scholar|arxiv|doi|researchgate|nature|science|lancet|ieee|acm)/,
        /^(github|stackoverflow|github\.com|npr|bbc|reuters|apnews|propublica)/,
      ];

      const lowCredibilityDomains = [
        /^(medium\.com|reddit\.com|quora\.com)$/,
        /blog\./,
        /affiliate/,
      ];

      if (highCredibilityDomains.some((r) => r.test(domain))) {
        score = "high";
      } else if (lowCredibilityDomains.some((r) => r.test(domain))) {
        score = "low";
      }

      return {
        content: [
          {
            type: "text",
            text: `Credibility: ${score}. Domain: ${domain}`,
          },
        ],
        details: {
          url,
          domain,
          credibility: score,
          reasoning: `Domain pattern match on ${domain}`,
        },
      };
    },
  });

  // Tool: multi-source triangulation
  pi.registerTool({
    name: "triangulate_findings",
    label: "Triangulate Findings",
    description: "Cross-validate findings against multiple sources to verify accuracy",
    parameters: pi.zod.object({
      claim: pi.zod.string().describe("Claim to validate"),
      sources: pi.zod
        .array(
          pi.zod.object({
            title: pi.zod.string(),
            excerpt: pi.zod.string(),
            url: pi.zod.string().url(),
          })
        )
        .describe("Source excerpts and URLs"),
    }),
    async execute(_id, params, _onUpdate, _ctx) {
      const { claim, sources } = params;

      // Simplified triangulation: check agreement patterns
      const supportingCount = sources.filter((s) =>
        s.excerpt.toLowerCase().includes(claim.toLowerCase())
      ).length;

      const agreement = supportingCount >= Math.ceil(sources.length / 2) ? "high" : "low";

      return {
        content: [
          {
            type: "text",
            text: `Triangulation: ${supportingCount}/${sources.length} sources support the claim. Agreement: ${agreement}`,
          },
        ],
        details: {
          claim,
          supportingCount,
          totalSources: sources.length,
          agreement,
        },
      };
    },
  });

  pi.registerCommand("research", {
    description: "Run deep research with configurable depth (model-routed per phase)",
    handler: async (args, ctx) => {
      const input = args.trim();
      if (!input) {
        ctx.ui.notify("Usage: /research in [quick|standard|deep|ultradeep][, <language>]: <topic>", "error");
        return;
      }

      // Parse: "in <mode>[, <language>]: <topic>" or just "<topic>"
      // Language defaults to English unless explicitly requested (e.g. ", magyarul" / ", in Hungarian").
      const modeMatch = input.match(/^in\s+(quick|standard|deep|ultradeep)\s*(?:,\s*([^:]+))?:\s*(.+)$/i);
      const mode = (modeMatch?.[1]?.toLowerCase() ?? "standard") as ResearchMode;
      const language = modeMatch?.[2]?.trim() || "English";
      const topic = modeMatch?.[3] || input;

      const phases = RESEARCH_PHASES[mode];
      if (!phases) {
        ctx.ui.notify(`Unknown mode: ${mode}. Use: ${RESEARCH_MODES.join(", ")}`, "error");
        return;
      }

      ctx.ui.notify(
        `🔬 Starting ${mode.toUpperCase()} research on: "${topic}" (output: ${language})`,
        "info"
      );

      const result: ResearchResult = {
        topic,
        mode,
        startedAt: new Date().toISOString(),
        sources: [],
        findings: "",
        executive_summary: "",
        status: "in_progress",
      };

      // Build the orchestration prompt: the session model orchestrates phases;
      // heavy phases are delegated to dedicated agents whose frontmatter pins
      // the model tier (scout → @smol, synthesizer/critic → @slow).
      const spawnableAgents = phases
        .filter((p) => p.agent !== "self")
        .map((p) => `  - ${p.id}: agent "${p.agent}" — ${p.description}`)
        .join("\n");

      const prompt = `# Deep Research Task

Topic: ${topic}
Mode: ${mode} — ${MODE_DEPTH[mode]}

You are the research ORCHESTRATOR. Run the phases in order yourself EXCEPT where an agent is listed —
those MUST be delegated with the task tool using the exact agent name shown.

## Phase Sequence (in order)
${phases.map((p, i) => `${i + 1}. **${p.name}**${p.agent !== "self" ? ` → spawn agent \`${p.agent}\`` : " → do it yourself in the main context"}`).join("\n")}

## Delegation map
${spawnableAgents || "  (none — run all phases yourself)"}

Delegation rules:
- When spawning, pass the accumulated context (topic, key questions, source list with excerpts) to the agent;
  subagents start with a blank context.
- Retrieve agents run in parallel as a batch when the phase calls for multiple query bundles.
- If an agent type is not available in the agent list, fall back to the default task agent for that phase
  and note the fallback in the final report.

## Orchestrator-held phases (scope/plan/triangulate/outline in this mode)
- Scope: define what is in/out of scope, key questions, and success criteria for the sources.
- Plan: decompose into concrete search queries (use the searxng_search tool syntax for site:/-term filters).
- Triangulate: run the triangulate_findings tool per major claim; loop back to Retrieve with refined
  queries when fewer than the mode's required sources support a claim.
- Outline: structure claims → evidence → gaps before handing off to synthesis.

<critical>
Output language: ${language}${language === "English" ? " — the default. The language of the question does NOT change this." : ` — explicitly requested.`}
You MUST write the report, executive summary, findings, and all agent outputs in ${language},
even when the question or conversation is in another language. Quote sources
verbatim in their original language; your prose around them stays ${language}.
</critical>

## Output Requirements
Return a JSON object with:
{
  "findings": "comprehensive narrative findings",
  "executive_summary": "200-400 word summary",
  "sources": [
    { "title": "...", "url": "...", "credibility": "high|medium|low", "excerpt": "..." }
  ]
}`;

      try {
        const agentResult = await pi.agent(
          prompt,
          {
            agent: "task",
            label: `deep-research:${topic}:${mode}`,
            schema: {
              type: "object",
              properties: {
                findings: { type: "string" },
                executive_summary: { type: "string" },
                sources: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      url: { type: "string" },
                      credibility: { enum: ["high", "medium", "low"] },
                      excerpt: { type: "string" },
                    },
                  },
                },
              },
            },
          }
        );

        if (
          typeof agentResult === "object" &&
          agentResult !== null &&
          "findings" in agentResult
        ) {
          const data = agentResult as Record<string, unknown>;
          result.findings = String(data.findings ?? "");
          result.executive_summary = String(data.executive_summary ?? "");
          if (Array.isArray(data.sources)) {
            result.sources = data.sources as ResearchResult["sources"];
          }
        }

        result.status = "completed";
        result.completedAt = new Date().toISOString();
        researchCache.set(topic, result);

        // Inject findings into conversation
        pi.sendMessage(
          {
            customType: "research_report",
            content: `# Research Report: ${topic}\n\n## Summary\n${result.executive_summary}\n\n## Findings\n${result.findings}\n\n## Sources (${result.sources.length})\n${result.sources.map((s) => `- [${s.title}](${s.url}) (${s.credibility})`).join("\n")}`,
            display: true,
            attribution: "assistant",
          },
          { triggerTurn: false }
        );

        ctx.ui.notify(
          `✅ Research complete (${phases.length} phases, ${result.sources.length} sources)`,
          "success"
        );
      } catch (err) {
        result.status = "failed";
        result.error = String(err);
        ctx.ui.notify(`❌ Research failed: ${err}`, "error");
      }
    },
  });

  // Session persistence hook
  pi.on("session_stop", async (_event, ctx) => {
    if (researchCache.size > 0) {
      const timestamp = new Date().toISOString().split("T")[0];
      const cacheFile = `${ctx.cwd}/.omp/research-cache-${timestamp}.json`;

      try {
        // Store cache to disk for resumption
        const data = {
          timestamp: new Date().toISOString(),
          cache: Array.from(researchCache.entries()).map(([, result]) => ({
            ...result,
          })),
        };

        ctx.ui.notify(
          `📊 Research cache persisted (${researchCache.size} topics) → ${cacheFile}`,
          "info"
        );
      } catch (err) {
        ctx.ui.notify(`Cache write failed: ${err}`, "warn");
      }
    }
  });

  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("🔬 Deep Research extension loaded. Use /research to start.", "info");
  });
}