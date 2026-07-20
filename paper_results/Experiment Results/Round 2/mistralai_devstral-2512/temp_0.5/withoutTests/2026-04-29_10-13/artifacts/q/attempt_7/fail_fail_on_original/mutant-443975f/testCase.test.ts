// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-443975f/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior with setImmediate", () => {
  it("should use setImmediate when available for nextTick", (done) => {
    // This test verifies that Q.nextTick uses setImmediate when available
    // by checking that tasks are executed in the correct order
    const originalSetImmediate = global.setImmediate;
    let executionOrder: string[] = [];

    // Mock setImmediate to track its usage
    global.setImmediate = function (callback: () => void) {
      executionOrder.push("setImmediate");
      return originalSetImmediate(() => {
        executionOrder.push("setImmediate-callback");
        callback();
      });
    } as any;

    // Mock setTimeout to detect fallback usage
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function (callback: () => void, delay: number) {
      executionOrder.push("setTimeout");
      return originalSetTimeout(() => {
        executionOrder.push("setTimeout-callback");
        callback();
      }, delay);
    } as any;

    try {
      q.nextTick(() => {
        executionOrder.push("nextTick-callback");
      });

      // Check after a short delay to see which mechanism was used
      setTimeout(() => {
        try {
          // In the original code, setImmediate should be used
          // In the mutated code, it will fall back to setTimeout
          if (typeof global.setImmediate === 'function') {
            // The test should pass on original (setImmediate used) and fail on mutated (setTimeout used)
            expect(executionOrder.includes("setImmediate")).toBe(true);
            expect(executionOrder.includes("setTimeout")).toBe(false);
          }
          done();
        } catch (error) {
          done(error);
        }
      }, 50);
    } finally {
      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.setTimeout = originalSetTimeout;
    }
  }, 1000);
});