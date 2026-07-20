// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-443975f/testCase.test.ts
import { Q } from "./q.js";

describe("Q.nextTick behavior with setImmediate", () => {
  it("should use setImmediate when available for nextTick", (done) => {
    // This test verifies that Q.nextTick uses setImmediate when available
    // by checking the execution order of tasks
    const originalSetImmediate = global.setImmediate;
    let executionOrder: string[] = [];

    // Mock setImmediate to track its usage
    global.setImmediate = function (callback: () => void) {
      executionOrder.push("setImmediate");
      originalSetImmediate(() => {
        executionOrder.push("setImmediate-callback");
        callback();
      });
    } as any;

    // Also mock setTimeout to detect fallback usage
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function (callback: () => void, delay: number) {
      executionOrder.push("setTimeout");
      return originalSetTimeout(() => {
        executionOrder.push("setTimeout-callback");
        callback();
      }, delay);
    } as any;

    try {
      Q.nextTick(() => {
        executionOrder.push("nextTick-callback");
        // Verify that setImmediate was used (not setTimeout)
        expect(executionOrder).toContain("setImmediate");
        expect(executionOrder).toContain("setImmediate-callback");
        // Ensure the callback executed
        expect(executionOrder).toContain("nextTick-callback");
        done();
      });

      // Give time for the async operations to complete
      setTimeout(() => {
        if (executionOrder.length === 0) {
          done.fail(new Error("nextTick callback was never executed"));
        }
      }, 100);
    } finally {
      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.setTimeout = originalSetTimeout;
    }
  });
});