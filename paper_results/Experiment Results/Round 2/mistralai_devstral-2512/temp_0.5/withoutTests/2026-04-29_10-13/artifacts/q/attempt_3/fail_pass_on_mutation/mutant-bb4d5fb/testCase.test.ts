// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-bb4d5fb/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
      fail("Should have thrown an error");
    } catch (e: any) {
      // Check that the stack trace doesn't contain Q internal frames
      // This test relies on the fact that the original code filters out
      // internal Q frames, while the mutated code (return true &&) would
      // not filter them properly
      expect(e).toBe(error);
      if (e.stack) {
        // The stack should not contain references to q.js internal functions
        expect(e.stack).not.toContain("q.js");
      }
    }
  });
});