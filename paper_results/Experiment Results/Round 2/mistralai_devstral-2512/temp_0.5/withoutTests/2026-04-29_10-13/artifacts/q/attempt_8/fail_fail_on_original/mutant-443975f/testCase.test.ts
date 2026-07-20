// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-443975f/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior with setImmediate", () => {
  it("should use setImmediate when available for nextTick", (done) => {
    // This test verifies that Q.nextTick uses setImmediate when available
    // by checking execution order and timing
    const originalSetImmediate = global.setImmediate;
    const originalSetTimeout = global.setTimeout;
    let setImmediateUsed = false;
    let setTimeoutUsed = false;

    // Mock setImmediate to track its usage
    global.setImmediate = function (callback: () => void) {
      setImmediateUsed = true;
      return originalSetImmediate(callback);
    } as any;

    // Mock setTimeout to track its usage
    global.setTimeout = function (callback: () => void, delay: number) {
      setTimeoutUsed = true;
      return originalSetTimeout(callback, delay);
    } as any;

    try {
      q.nextTick(() => {
        // In the original code, setImmediate should be used
        // In the mutated code, it will fall back to setTimeout
        if (typeof global.setImmediate === 'function') {
          expect(setImmediateUsed).toBe(true);
          expect(setTimeoutUsed).toBe(false);
        }
        done();
      });

      // Safety timeout
      setTimeout(() => {
        done();
      }, 100);
    } finally {
      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.setTimeout = originalSetTimeout;
    }
  }, 1000);
});