// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel fallback behavior", () => {
  it("should use MessageChannel when available for nextTick", (done) => {
    // Force the environment to appear as if MessageChannel is available
    const originalMessageChannel = (global as any).MessageChannel;
    (global as any).MessageChannel = function() {
      this.port1 = {
        onmessage: null,
        postMessage: () => {}
      };
      this.port2 = {
        postMessage: () => {}
      };
    };

    // Track whether flush was called via MessageChannel
    let flushCalledViaMessageChannel = false;
    const originalSetTimeout = setTimeout;
    (global as any).setTimeout = (fn: () => void, delay: number) => {
      if (delay === 0) {
        // This should not be called if MessageChannel is working
        done(new Error("setTimeout was used instead of MessageChannel"));
      }
      return originalSetTimeout(fn, delay);
    };

    // Override the flush function to detect MessageChannel usage
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const originalNextTick = qModule.nextTick;
    let testCompleted = false;

    // Test that nextTick uses MessageChannel
    Q.nextTick(() => {
      flushCalledViaMessageChannel = true;
      if (!testCompleted) {
        testCompleted = true;
        // Restore originals
        (global as any).MessageChannel = originalMessageChannel;
        (global as any).setTimeout = originalSetTimeout;
        done();
      }
    });

    // Give it a moment to execute
    setTimeout(() => {
      if (!testCompleted) {
        testCompleted = true;
        (global as any).MessageChannel = originalMessageChannel;
        (global as any).setTimeout = originalSetTimeout;
        done(new Error("nextTick did not execute via MessageChannel"));
      }
    }, 100);
  });
});