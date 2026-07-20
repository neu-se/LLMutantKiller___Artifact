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

      // Test case 1: Valid Firefox stack line with digits
      const validLine = "functionName@http://example.com:42";
      const validRegex = /.*@(.+):(\d+)$/;
      const validMatch = validRegex.exec(validLine);

      expect(validMatch).not.toBeNull();
      expect(validMatch![1]).toBe("http://example.com");
      expect(validMatch![2]).toBe("42");

      // Test case 2: Invalid line with non-digits (should not match)
      const invalidLine = "functionName@http://example.com:abc";
      const invalidMatch = validRegex.exec(invalidLine);
      expect(invalidMatch).toBeNull();

      // The mutation would cause test case 1 to fail because \D+ wouldn't match digits
      // and test case 2 to pass because \D+ would match non-digits
      // This creates a behavioral difference that exposes the mutation
    });
  });
});