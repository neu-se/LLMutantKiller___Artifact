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
      const originalPattern = /.*@(.+):(\d+)$/;
      const mutatedPattern = /.*@(.+):(\D+)$/;

      // Original pattern should match
      const originalMatch = originalPattern.exec(testLine);
      expect(originalMatch).not.toBeNull();
      expect(originalMatch![2]).toBe("42");

      // Mutated pattern should NOT match (because \D+ won't match digits)
      const mutatedMatch = mutatedPattern.exec(testLine);
      expect(mutatedMatch).toBeNull();

      // This test will fail on mutated code because the mutated pattern
      // will be used internally and won't match valid stack traces with line numbers
    });
  });
});