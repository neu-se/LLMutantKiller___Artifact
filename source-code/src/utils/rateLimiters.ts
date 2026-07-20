// src/utils/rateLimiters.ts

export interface IRateLimiter {
  /** Wait before the next request. */
  wait(): Promise<void>;
  /**
   * Provide feedback after a request.
   * Returns the current delay and whether it increased (so callers can log).
   */
  feedback(input: {
    status: number;
    retryAfterMs?: number;
    latencyMs?: number;
  }): { delayMs: number; increased: boolean; reason?: "rate_limit" | "server" | "latency" | "success" };
  /** Human description (for logs). */
  getDescription(): string;
  /** Current delay in ms. */
  getDelayMs(): number;
}

/** No throttling. */
export class NoRateLimiter implements IRateLimiter {
  async wait() {}
  feedback(): { delayMs: number; increased: boolean; reason?: any } {
    return { delayMs: 0, increased: false, reason: "success" };
  }
  getDescription(): string { return "NoRateLimiter"; }
  getDelayMs(): number { return 0; }
}

/** One request every N ms (constant). */
export class FixedRateLimiter implements IRateLimiter {
  constructor(private delayMs: number) {}
  async wait() { await new Promise(r => setTimeout(r, this.delayMs)); }
  feedback(): { delayMs: number; increased: boolean; reason?: any } {
    return { delayMs: this.delayMs, increased: false, reason: "success" };
  }
  getDescription(): string { return `FixedRateLimiter (1 req / ${this.delayMs} ms)`; }
  getDelayMs(): number { return this.delayMs; }
}

export class BenchmarkRateLimiter implements IRateLimiter {
  private delayMs: number;
  private count = 0;
  private static INITIAL = 10_000;
  private static AFTER_150 = 5_000;
  private static AFTER_300 = 2_500;
  constructor() { this.delayMs = BenchmarkRateLimiter.INITIAL; }
  async wait() { await new Promise(r => setTimeout(r, this.delayMs)); }
  feedback(): { delayMs: number; increased: boolean; reason?: any } {
    this.count++;
    if (this.count === 150) this.delayMs = BenchmarkRateLimiter.AFTER_150;
    else if (this.count === 300) this.delayMs = BenchmarkRateLimiter.AFTER_300;
    return { delayMs: this.delayMs, increased: false, reason: "success" };
  }
  getDescription(): string { return "BenchmarkRateLimiter (ramps up at 150 & 300)"; }
  getDelayMs(): number { return this.delayMs; }
}

/**
 * Adaptive limiter (AIMD):
 * - success: decrease delay additively
 * - 429/5xx: increase delay multiplicatively (or to Retry-After)
 * - watches latency EWMA and nudges delay up if latency spikes
 */
export class AdaptiveLimiter implements IRateLimiter {
  private delay: number;
  private ewma = 0;
  constructor(
    private startDelayMs = 800,
    private minDelayMs = 100,
    private maxDelayMs = 15_000,
    private decStepMs = 50, // success: -50ms
    private incFactor = 2,  // 429/5xx: x2
    private ewmaAlpha = 0.2
  ) {
    this.delay = this.startDelayMs;
  }
  async wait() { await new Promise(r => setTimeout(r, this.delay)); }
  feedback({ status, retryAfterMs, latencyMs }: { status: number; retryAfterMs?: number; latencyMs?: number }) {
    let increased = false;
    let reason: "rate_limit" | "server" | "latency" | "success" = "success";

    if (typeof latencyMs === "number") {
      this.ewma = this.ewma === 0 ? latencyMs : (this.ewma * (1 - this.ewmaAlpha) + latencyMs * this.ewmaAlpha);
      if (this.ewma > 800 && this.delay < 2_000) {
        this.delay = Math.min(this.delay + 100, this.maxDelayMs);
        increased = true;
        reason = "latency";
      }
    }

    if (status >= 200 && status < 300) {
      // success: try faster
      const prev = this.delay;
      this.delay = Math.max(this.minDelayMs, this.delay - this.decStepMs);
      if (this.delay > prev) { increased = true; reason = "success"; }
      return { delayMs: this.delay, increased, reason };
    }

    if (status === 429) {
      const prev = this.delay;
      if (retryAfterMs && retryAfterMs > 0) {
        this.delay = Math.min(Math.max(retryAfterMs, this.delay), this.maxDelayMs);
      } else {
        this.delay = Math.min(this.delay * this.incFactor, this.maxDelayMs);
      }
      increased = this.delay > prev;
      reason = "rate_limit";
      return { delayMs: this.delay, increased, reason };
    }

    if (status >= 500 && status < 600) {
      const prev = this.delay;
      this.delay = Math.min(this.delay * this.incFactor, this.maxDelayMs);
      increased = this.delay > prev;
      reason = "server";
      return { delayMs: this.delay, increased, reason };
    }

    return { delayMs: this.delay, increased, reason };
  }
  getDescription(): string {
    return `AdaptiveLimiter (AIMD, start=${this.startDelayMs}ms, min=${this.minDelayMs}ms)`;
  }
  getDelayMs(): number { return this.delay; }
}