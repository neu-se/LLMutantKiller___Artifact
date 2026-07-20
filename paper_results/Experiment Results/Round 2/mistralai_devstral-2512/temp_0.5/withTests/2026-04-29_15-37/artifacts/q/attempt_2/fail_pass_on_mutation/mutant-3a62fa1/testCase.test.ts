// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick environment detection", () => {
  it("should correctly detect Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q.nextTick correctly identifies Node.js environment
    // The mutation changes the condition from checking for process object to always true
    // which would break the proper environment detection

    // Save original process.nextTick
    const originalNextTick = process.nextTick;
    let nextTickUsed = false;

    // Mock process.nextTick to track if it's called
    process.nextTick = function(callback) {
      nextTickUsed = true;
      originalNextTick.call(process, callback);
    };

    // Test that Q.nextTick uses process.nextTick in Node.js
    Q.nextTick(() => {
      // Restore original process.nextTick
      process.nextTick = originalNextTick;

      // In the original code, this should be true because we're in Node.js
      // In the mutated code, the condition is always true, which might affect other environments
      expect(nextTickUsed).toBe(true);
      done();
    });
  });
});