# Advanced Patterns & Customization

## Custom Research Orchestration

### 1. Domain-Specific Personas

Extend the critique phase with custom personas tailored to your domain:

```typescript
const DOMAIN_PERSONAS = {
  healthcare: [
    "Epidemiologist: focuses on population health and bias in studies",
    "Clinician: emphasizes practical applicability and patient safety",
    "Biostatistician: scrutinizes methodology and p-hacking risks",
  ],
  fintech: [
    "Regulatory Compliance Officer: highlights legal/SEC implications",
    "Risk Manager: stress-tests assumptions and edge cases",
    "Product Engineer: focuses on implementation feasibility",
  ],
};

// In critique phase, spawn agents with domain-specific prompt
```

### 2. Multi-Agent Coordination via Hub

For comprehensive research across teams:

```typescript
pi.on("tool_call", async (event, ctx) => {
  if (event.toolName !== "web_search") return;

  // Notify other agents of search queries
  await pi.hub.send({
    to: "ResearchCoordinator",
    message: `Search query: ${JSON.stringify(event.input)}`,
  });
});
```

### 3. Custom Search Strategy

Override the default search categories:

```typescript
const CUSTOM_SEARCH_CATEGORIES = {
  "competitive-analysis": [
    "product comparisons {topic}",
    "{topic} feature matrix",
    "{topic} pricing 2025",
    "{topic} user reviews ratings",
    "{topic} technical benchmarks",
  ],
  "regulatory-deep-dive": [
    "{topic} SEC regulations",
    "{topic} compliance requirements",
    "{topic} legal precedents",
    "{topic} enforcement actions",
  ],
};
```

## Integration Patterns

### 1. Research + Memory

Persist findings to OMP memory for cross-session reuse:

```typescript
pi.registerTool({
  name: "store_research_finding",
  description: "Save a research finding to session memory",
  parameters: pi.zod.object({
    topic: pi.zod.string(),
    finding: pi.zod.string(),
    confidence: pi.zod.enum(["high", "medium", "low"]),
  }),
  async execute(_id, params, _onUpdate, ctx) {
    // Integrate with OMP memory system
    // ctx.memory?.store(...)
    return {
      content: [{ type: "text", text: "Finding stored" }],
    };
  },
});
```

### 2. Research + Version Control

Auto-commit research reports to git:

```typescript
pi.on("session_stop", async (_event, ctx) => {
  const cacheFile = path.join(ctx.cwd, `.omp/research-cache-${date}.json`);
  
  await pi.exec("git", [
    "add",
    cacheFile,
    "-m",
    `research: cache update ${date}`,
  ]);
});
```

### 3. Research + Dashboard

Export findings to a local dashboard:

```typescript
async function exportToDashboard(result: ResearchResult, ctx) {
  const dashboardPath = path.join(ctx.cwd, "research-dashboard.json");
  
  const dashboard = {
    title: result.topic,
    updatedAt: result.completedAt,
    summary: result.executive_summary,
    sourceCount: result.sources.length,
    credibilityBreakdown: {
      high: result.sources.filter(s => s.credibility === "high").length,
      medium: result.sources.filter(s => s.credibility === "medium").length,
      low: result.sources.filter(s => s.credibility === "low").length,
    },
  };
  
  pi.writeFile(dashboardPath, JSON.stringify(dashboard, null, 2));
}
```

## Extending Source Credibility

### Add Custom Domain Rules

```typescript
const CUSTOM_CREDIBILITY_RULES = [
  // Rule: Internal company research portal
  {
    pattern: /^https?:\/\/research\.ourcompany\.com/,
    credibility: "high" as const,
    reason: "Internal vetted research",
  },
  // Rule: Specific academic journals
  {
    pattern: /^https?:\/\/(nature|science|cell)\.com/,
    credibility: "high" as const,
    reason: "Top-tier peer review",
  },
  // Rule: Exclude spam domains
  {
    pattern: /\.(xyz|tk|ml|top)$/,
    credibility: "low" as const,
    reason: "Known spam TLDs",
  },
];

function assessCredibilityCustom(url: string): string {
  const rule = CUSTOM_CREDIBILITY_RULES.find(r => r.pattern.test(url));
  return rule?.credibility ?? "medium";
}
```

## Failure Recovery Strategies

### 1. Automatic Retry with Refined Queries

```typescript
async function searchWithRetry(
  query: string,
  maxRetries: number = 3
): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const results = await pi.web_search(query);
      if (results.length >= 3) return results; // enough sources
      
      // Retry with refined query
      const refined = await refineQuery(query);
      query = refined;
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await delay(1000 * (i + 1)); // exponential backoff
    }
  }
}
```

### 2. Contradiction Detection & Resolution

```typescript
pi.registerTool({
  name: "detect_contradictions",
  description: "Find conflicting claims in sources",
  parameters: pi.zod.object({
    findings: pi.zod.array(pi.zod.object({
      claim: pi.zod.string(),
      sources: pi.zod.array(pi.zod.string()),
    })),
  }),
  async execute(_id, params) {
    const contradictions: any[] = [];
    
    for (let i = 0; i < params.findings.length; i++) {
      for (let j = i + 1; j < params.findings.length; j++) {
        const similarity = computeSimilarity(
          params.findings[i].claim,
          params.findings[j].claim
        );
        if (similarity > 0.7 && contradicts(params.findings[i], params.findings[j])) {
          contradictions.push({
            claim1: params.findings[i],
            claim2: params.findings[j],
            resolution: "needs manual review",
          });
        }
      }
    }
    
    return {
      content: [{ type: "text", text: `Found ${contradictions.length} potential contradictions` }],
      details: { contradictions },
    };
  },
});
```

## Configuration via Environment

```typescript
// In extension initialization
const config = {
  maxSourcesPerMode: {
    quick: 5,
    standard: 10,
    deep: 15,
    ultradeep: 20,
  },
  phaseTimeoutSeconds: parseInt(process.env.RESEARCH_TIMEOUT || "300"),
  minSourcesPerClaim: parseInt(process.env.MIN_SOURCES || "3"),
  enableCritique: process.env.ENABLE_CRITIQUE !== "false",
  cachePath: process.env.RESEARCH_CACHE_DIR || ".omp/",
};
```

## Testing Strategies

### Unit Test Template

```typescript
// test/deep-research.test.ts
import { describe, it, expect } from "@jest/globals";

describe("Deep Research Extension", () => {
  it("should assess source credibility correctly", () => {
    const testCases = [
      { url: "https://arxiv.org/abs/...", expected: "high" },
      { url: "https://medium.com/...", expected: "medium" },
      { url: "https://spam.xyz/...", expected: "low" },
    ];
    
    testCases.forEach(({ url, expected }) => {
      expect(assessSourceCredibility(url)).toBe(expected);
    });
  });
});
```

### Integration Test: Full Research Loop

```typescript
// Run in OMP session for end-to-end testing
it("should complete standard research without errors", async () => {
  const result = await orchestrateResearch({
    topic: "test topic",
    mode: "quick", // fast for testing
  });
  
  expect(result.status).toBe("completed");
  expect(result.sources.length).toBeGreaterThanOrEqual(3);
  expect(result.findings.length).toBeGreaterThan(100);
});
```

---

**Next Steps**: Contribute domain-specific personas, integrate with your favorite fact-checking APIs, or add language support!
