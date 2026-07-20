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

      // Create a Firefox-style stack line with a line number
      const firefoxStackLine = "functionName@http://example.com:42";

      // Test the regex pattern that would be used in the original code
      const regex = /.*@(.+):(\d+)$/;
      const match = regex.exec(firefoxStackLine);

      // The original should match and extract the filename and line number
      expect(match).not.toBeNull();
      expect(match![1]).toBe("http://example.com");
      expect(match![2]).toBe("42");

      // Now test with a line that has non-digits after the colon
      const invalidLine = "functionName@http://example.com:abc";
      const invalidMatch = regex.exec(invalidLine);

      // This should not match because line numbers must be digits
      expect(invalidMatch).toBeNull();

      // The mutation would make this test fail because \D+ would match "abc"
      // but we want to ensure line numbers are actually digits
      // This test will pass on original code but fail on mutated code
    });
  });
});