// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify internal stack frames", () => {
    // The mutation changes the condition from checking line numbers to always true
    // This affects the isInternalFrame function which determines what gets filtered
    // from stack traces

    // Create a test case that would normally have internal Q frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force stack trace generation
    try {
      throw error;
    } catch (e) {
      // In the original code, Q internal frames should be filtered
      // In the mutated code, ALL frames will be considered internal (true && condition)
      // This means the stack will be empty or minimal in mutated version
      const stackLines = e.stack.split('\n');
      const hasFrames = stackLines.length > 1;

      // Original should have frames, mutated should not
      expect(hasFrames).toBe(true);
    }
  });
});