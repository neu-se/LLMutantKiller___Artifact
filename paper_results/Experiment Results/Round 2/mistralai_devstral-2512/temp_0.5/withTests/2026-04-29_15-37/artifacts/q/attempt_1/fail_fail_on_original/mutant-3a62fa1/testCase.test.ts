// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should use process.nextTick in Node.js environment", (done) => {
    // This test verifies that Q.nextTick uses process.nextTick when in a Node.js environment
    // The mutation changes the condition from checking for process object to always true
    // which would break the Node.js specific behavior

    // Create a spy to track if process.nextTick was called
    const originalNextTick = process.nextTick;
    let nextTickCalled = false;

    // Override process.nextTick to track calls
    process.nextTick = function(callback) {
      nextTickCalled = true;
      originalNextTick.call(process, callback);
    };

    // Use Q.nextTick which should use process.nextTick in Node.js
    Q.nextTick(() => {
      // Restore original process.nextTick
      process.nextTick = originalNextTick;

      // Verify that process.nextTick was actually called
      expect(nextTickCalled).toBe(true);
      done();
    });
  });
});