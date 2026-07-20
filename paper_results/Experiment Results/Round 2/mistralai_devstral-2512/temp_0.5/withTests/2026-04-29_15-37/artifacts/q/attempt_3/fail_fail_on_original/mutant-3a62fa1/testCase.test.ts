// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick environment detection", () => {
  it("should use process.nextTick only in Node.js environment", (done) => {
    // This test verifies that Q.nextTick only uses process.nextTick when actually in Node.js
    // The mutation changes the condition from checking for process object to always true
    // which would incorrectly use process.nextTick even when not in Node.js

    // Save original process
    const originalProcess = global.process;

    // Simulate non-Node.js environment by removing process
    delete global.process;

    // Mock setImmediate to track if it's used as fallback
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    global.setImmediate = function(callback) {
      setImmediateUsed = true;
      originalSetImmediate.call(global, callback);
    };

    // Test that Q.nextTick uses setImmediate fallback when not in Node.js
    Q.nextTick(() => {
      // Restore original process and setImmediate
      global.process = originalProcess;
      global.setImmediate = originalSetImmediate;

      // In original code, this should be true because we removed process
      // In mutated code, it will be false because it always tries to use process.nextTick
      expect(setImmediateUsed).toBe(true);
      done();
    });
  });
});