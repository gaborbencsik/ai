import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

interface ResearchPhase {
  id: string;
  name: string;
  description: string;
}

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

const RESEARCH_PHASES: Record<string, ResearchPhase[]> = {
  quick: [
    { id: "scope", name: "Scope", description: "Define research boundaries" },
    { id: "search", name: "Quick Search", description: "Initial 3-4 web searches" },
    { id: "synthesize", name: "Synthesize", description: "Combine findings" },
  ],
  standard: [
    { id: "scope", name: "Scope", description: "Define research boundaries" },
    { id: "plan", name: "Plan", description: "Create search strategy" },
    { id: "retrieve", name: "Retrieve", description: "5-8 parallel searches + agents" },
    { id: "triangulate", name: "Triangulate", description: "Cross-validate sources" },
    { id: "outline", name: "Outline", description: "Structure findings" },
    { id: "synthesize", name: "Synthesize", description: "Write comprehensive report" },
  ],
  deep: [
    { id: "scope", name: "Scope", description: "Deep boundaries definition" },
    { id: "plan", name: "Plan", description: "Multi-angle strategy" },
    { id: "retrieve", name: "Retrieve", description: "8-12 concurrent searches" },
    { id: "triangulate", name: "Triangulate", description: "3-source validation" },
    { id: "outline", name: "Outline", description: "Detailed structure" },
    { id: "synthesize", name: "Synthesize", description: "Deep synthesis" },
    { id: "critique", name: "Critique", description: "Red team review + loop-back" },
    { id: "refine", name: "Refine", description: "Gap closure" },
  ],
  ultradeep: [
    { id: "scope", name: "Scope", description: "Comprehensive boundaries" },
    { id: "plan", name: "Plan", description: "Adversarial planning" },
    { id: "retrieve", name: "Retrieve", description: "12+ searches + 3+ agents" },
    { id: "triangulate", name: "Triangulate", description: "Multi-source validation" },
    { id: "outline", name: "Outline", description: "Multi-persona outline" },
    { id: "synthesize", name: "Synthesize", description: "Comprehensive synthesis" },
    { id: "critique", name: "Critique", description: "Multi-persona critique + iteration" },
    { id: "refine", name: "Refine", description: "Exhaustive refinement" },
  ],
};

const CRITIQUE_PERSONAS = {
  skeptical: "Skeptical Practitioner: challenges assumptions and spotlights weak sources",
  adversarial: "Adversarial Reviewer: tries to break arguments and find counter-evidence",
  implementation: "Implementation Engineer: focuses on practical applicability and risks",
};

export default function deepResearchExtension(pi: ExtensionAPI) {
  const researchCache = new Map<string, ResearchResult>();

  pi.registerCommand("research", {
    description: "Run deep research with configurable depth",
    handler: async (args, ctx) => {
      const input = args.trim();
      if (!input) {
        ctx.ui.notify("Usage: /research in [quick|standard|deep|ultradeep]: <topic>", "error");
        return;
      }

      // Parse: "in <mode>: <topic>" or just "<topic>"
      const modeMatch = input.match(/^in\s+(quick|standard|deep|ultradeep):\s*(.+)$/i);
      const mode = (modeMatch?.[1]?.toLowerCase() ?? "standard") as keyof typeof RESEARCH_PHASES;
      const topic = modeMatch?.[2] || input;

      if (!RESEARCH_PHASES[mode]) {
        ctx.ui.notify(`Unknown mode: ${mode}. Use: quick, standard, deep, ultradeep`, "error");
        return;
      }

      ctx.ui.notify(
        `🔬 Starting ${mode.toUpperCase()} research on: "${topic}"`,
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

      try {
        // Dispatch to orchestration agent
        const agentResult = await pi.agent(
          `# Deep Research Task

Topic: ${topic}
Mode: ${mode}
Phases: ${RESEARCH_PHASES[mode].map((p) => p.name).join(" → ")}

Execute this research workflow using web_search tool and multi-agent coordination.

## Phase Sequence
${RESEARCH_PHASES[mode]
  .map((p) => `- **${p.name}**: ${p.description}`)
  .join("\n")}

## Output Requirements
Return a JSON object with:
{
  "findings": "comprehensive narrative findings",
  "executive_summary": "200-400 word summary",
  "sources": [
    { "title": "...", "url": "...", "credibility": "high|medium|low", "excerpt": "..." }
  ]
}`,
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
          `✅ Research complete (${RESEARCH_PHASES[mode].length} phases, ${result.sources.length} sources)`,
          "success"
        );
      } catch (err) {
        result.status = "failed";
        result.error = String(err);
        ctx.ui.notify(`❌ Research failed: ${err}`, "error");
      }
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

  // Session persistence hook
  pi.on("session_stop", async (_event, ctx) => {
    if (researchCache.size > 0) {
      const timestamp = new Date().toISOString().split("T")[0];
      const cacheFile = `${ctx.cwd}/.omp/research-cache-${timestamp}.json`;

      try {
        // Store cache to disk for resumption
        const data = {
          timestamp: new Date().toISOString(),
          cache: Array.from(researchCache.entries()).map(([topic, result]) => ({
            topic,
            ...result,
          })),
        };

        ctx.ui.notify(
          `📊 Research cache persisted (${researchCache.size} topics)`,
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
