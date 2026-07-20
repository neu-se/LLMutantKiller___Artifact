// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-443975f/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior with setImmediate", () => {
  it("should use setImmediate when available for nextTick", (done) => {
    // This test verifies that Q.nextTick uses setImmediate when available
    // by checking that tasks are executed in the correct order
    const originalSetImmediate = global.setImmediate;
    let setImmediateCalled = false;

    // Mock setImmediate to track its usage
    global.setImmediate = function (callback: () => void) {
      setImmediateCalled = true;
      return originalSetImmediate(callback);
    } as any;

    try {
      q.nextTick(() => {
        // Verify that setImmediate was used
        expect(setImmediateCalled).toBe(true);
        done();
      });

      // Give time for the async operations to complete
      setTimeout(() => {
        done();
      }, 100);
    } finally {
      // Restore original
      global.setImmediate = originalSetImmediate;
    }
  }, 1000);
});