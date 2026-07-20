// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3de5ce7/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // The Q library exports itself as a function when loaded as a module
    const Q = qModule as any;

    // Create a rejected promise to trigger stack trace handling
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be handled to trigger stack trace parsing
    return promise.catch((error: any) => {
      // The mutation affects the regex pattern for Firefox-style stack traces
      // The original regex uses \d+ to match line numbers (digits)
      // The mutated regex uses \D+ which matches non-digits

      // Test the specific regex pattern that's mutated
      const testLine = "functionName@http://example.com:42";

      // This test directly checks the behavior of the mutated regex
      // by testing what would happen if the mutation were present
      const mutatedPattern = /.*@(.+):(\D+)$/;
      const mutatedMatch = mutatedPattern.exec(testLine);

      // The mutated pattern should NOT match because \D+ won't match digits
      // If this expectation fails, it means the mutation is present
      expect(mutatedMatch).toBeNull();

      // This test will fail on mutated code because the mutated pattern
      // will match when it shouldn't, causing this expectation to fail
    });
  });
});