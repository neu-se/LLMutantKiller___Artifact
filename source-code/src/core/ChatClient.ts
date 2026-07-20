// src/core/ChatClient.ts
import {
  IRateLimiter,
  NoRateLimiter,
  FixedRateLimiter,
  BenchmarkRateLimiter,
  AdaptiveLimiter,
} from "../utils";
import type { RateLimitMode } from "../types";

/* ================================
   Public client interface + cache
   ================================ */

export interface IChatClient {
  send(messages: Array<{ role: "user" | "assistant" | "system"; content: string }>): Promise<string>;
  getTotalTokensIn(): number;
  getTotalTokensOut(): number;
  getModel(): string;
  getPromptCacheMetrics(): PromptCacheMetrics | null;
}

export type PromptCacheMetrics = {
  cachedTokens: number;
  cacheWriteTokens: number;
  uncachedTokensIn: number;
  openRouterCost?: number;
};

type LimiterConfig = {
  mode?: RateLimitMode;      // "adaptive" | "fixed" | "benchmark" | "none"
  ms?: number;               // delay when mode === "fixed"
  transportRetries?: number; // default 3
};

export class ChatClient implements IChatClient {
  private apiEndpoint: string;
  private headers: Record<string, any>;
  /** Totals across all sends for one run. */
  public totalTokens = 0;   // kept for backward-compat (in+out)
  public totalTokensIn = 0; // prompt tokens
  public totalTokensOut = 0; // completion tokens
  public totalCachedTokens = 0;
  public totalCacheWriteTokens = 0;
  private totalOpenRouterCost: number | undefined = undefined;

  private limiter: IRateLimiter;
  private transportRetries: number;

  constructor(public model: string, private temperature: number, limiterCfg?: LimiterConfig) {
    const endpoint = process.env.OPENROUTER_LLM_API_ENDPOINT;
    const authHeaders = process.env.OPENROUTER_LLM_AUTH_HEADERS;
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!endpoint || (!authHeaders && !apiKey)) {
      throw new Error("OPENROUTER_LLM_API_ENDPOINT and either OPENROUTER_API_KEY or OPENROUTER_LLM_AUTH_HEADERS must be set");
    }
    this.apiEndpoint = endpoint;
    this.headers = {
      "Content-Type": "application/json",
      ...(authHeaders ? JSON.parse(authHeaders) : { Authorization: `Bearer ${apiKey}` }),
    };

    // ---- Build limiter (prefer CLI, then ENV, then defaults) ----
    const mode: RateLimitMode =
      (limiterCfg?.mode ?? (process.env.LLM_RATE_LIMIT_MODE as RateLimitMode)) ?? "adaptive";

    if (mode === "none") {
      this.limiter = new NoRateLimiter();
    } else if (mode === "fixed") {
      const ms = limiterCfg?.ms ?? Number(process.env.LLM_RATE_LIMIT_MS || "0");
      if (!ms || ms <= 0) {
        throw new Error("Rate limit mode 'fixed' requires a positive ms value");
      }
      this.limiter = new FixedRateLimiter(ms);
    } else if (mode === "benchmark") {
      this.limiter = new BenchmarkRateLimiter();
    } else {
      // adaptive
      const start = Number(process.env.LLM_ADAPTIVE_START_MS || 800);
      const min = Number(process.env.LLM_ADAPTIVE_MIN_MS || 100);
      const max = Number(process.env.LLM_ADAPTIVE_MAX_MS || 15000);
      const dec = Number(process.env.LLM_ADAPTIVE_DEC_MS || 50);
      const incF = Number(process.env.LLM_ADAPTIVE_INC_F || 2);
      this.limiter = new AdaptiveLimiter(start, min, max, dec, incF);
    }

    this.transportRetries =
      limiterCfg?.transportRetries ??
      Math.max(0, Number(process.env.LLM_TRANSPORT_RETRIES ?? 3));
  }

  private static parseRetryAfter(header: string | null): number | undefined {
    if (!header) return undefined;
    const num = Number(header);
    if (!Number.isNaN(num)) return Math.max(0, Math.floor(num * 1000));
    const t = Date.parse(header);
    if (!Number.isNaN(t)) return Math.max(0, t - Date.now());
    return undefined;
  }

  private shouldUseTopLevelCacheControl(): boolean {
    return (
      process.env.OPENROUTER_ENABLE_AUTO_CACHE === "true" &&
      this.model.startsWith("anthropic/claude")
    );
  }

  async send(
    messages: Array<{ role: "user" | "assistant" | "system"; content: string }>
  ): Promise<string> {
    const body: Record<string, unknown> = {
      model: this.model,
      messages,
      temperature: this.temperature,
    };

    if (this.shouldUseTopLevelCacheControl()) {
      body.cache_control = { type: "ephemeral" };
    }

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const warnRed = (s: string) => `\x1b[31m${s}\x1b[0m`;
    let lastErr: any = null;

    for (let attempt = 0; attempt <= this.transportRetries; attempt++) {
      try {
        await this.limiter.wait();
        const t0 = Date.now();
        const res = await fetch(this.apiEndpoint, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(body),
        });
        const latency = Date.now() - t0;

        const retryAfterMs = ChatClient.parseRetryAfter(res.headers.get("retry-after"));
        const fb = this.limiter.feedback({ status: res.status, retryAfterMs, latencyMs: latency });

        // Print RED warning when we back off due to rate limits or server errors
        if (fb.increased && (res.status === 429 || (res.status >= 500 && res.status < 600))) {
          console.warn(warnRed(`[llm] Facing ${res.status}; new delay ≈ ${fb.delayMs} ms`));
        }

        if (res.ok) {
          const json = await res.json();

          // Token accounting ONLY for this successful response:
          const usage = json?.usage ?? json?.choices?.[0]?.usage;
          let inTok = 0, outTok = 0;
          if (usage) {
            inTok = Number(usage.prompt_tokens ?? 0);
            outTok = Number(usage.completion_tokens ?? 0);
            if (this.shouldUseTopLevelCacheControl()) {
              const promptDetails = usage.prompt_tokens_details ?? {};
              this.totalCachedTokens += Number(promptDetails.cached_tokens ?? 0);
              this.totalCacheWriteTokens += Number(promptDetails.cache_write_tokens ?? 0);

              const cost = Number(usage.cost);
              if (Number.isFinite(cost)) {
                this.totalOpenRouterCost = (this.totalOpenRouterCost ?? 0) + cost;
              }
            }
          } else {
            // Heuristic, only for this successful response
            const reqChars = JSON.stringify(body.messages ?? []).length;
            const replyText =
              json?.choices?.[0]?.message?.content ??
              json?.choices?.[0]?.messages?.[0]?.content ??
              "";
            inTok = Math.ceil(reqChars / 4);
            outTok = Math.ceil(String(replyText).length / 4);
          }
          this.totalTokensIn += inTok;
          this.totalTokensOut += outTok;
          this.totalTokens += inTok + outTok;

          return (
            json?.choices?.[0]?.message?.content ??
            json?.choices?.[0]?.messages?.[0]?.content ??
            ""
          );
        }

        // Non-OK status: retry only for 429/5xx (transport-level)
        if (
          (res.status === 429 || (res.status >= 500 && res.status < 600)) &&
          attempt < this.transportRetries
        ) {
          if (retryAfterMs && retryAfterMs > 0) await sleep(retryAfterMs);
          continue;
        }

        const txt = await res.text();
        throw new Error(`LLM request failed: ${res.status} ${txt}`);
      } catch (e: any) {
        lastErr = e;
        // Network error → retry if attempts left
        if (attempt < this.transportRetries) continue;
        break;
      }
    }

    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
  }

  // --- IChatClient API ---
  getTotalTokensIn(): number { return this.totalTokensIn; }
  getTotalTokensOut(): number { return this.totalTokensOut; }
  getModel(): string { return this.model; }
  getPromptCacheMetrics(): PromptCacheMetrics | null {
    if (!this.shouldUseTopLevelCacheControl()) return null;

    const uncachedTokensIn = Math.max(
      0,
      this.totalTokensIn - this.totalCachedTokens - this.totalCacheWriteTokens
    );

    return {
      cachedTokens: this.totalCachedTokens,
      cacheWriteTokens: this.totalCacheWriteTokens,
      uncachedTokensIn,
      ...(typeof this.totalOpenRouterCost === "number"
        ? { openRouterCost: this.totalOpenRouterCost }
        : {}),
    };
  }
}
