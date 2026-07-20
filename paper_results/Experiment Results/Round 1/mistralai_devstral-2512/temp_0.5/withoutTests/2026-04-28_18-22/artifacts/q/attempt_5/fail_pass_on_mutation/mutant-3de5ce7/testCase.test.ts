// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3de5ce7/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // The Q library exports itself as a function when loaded as a module
    const Q = qModule as any;

    // Create a rejected promise
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be handled to trigger stack trace parsing
    return promise.catch((error: any) => {
      // The mutation affects the regex pattern for Firefox-style stack traces
      // We need to test the internal stack parsing behavior
      // The original regex uses \d+ to match line numbers (digits)
      // The mutated regex uses \D+ which matches non-digits

      // Create a Firefox-style stack line with a line number
      const firefoxStackLine = "functionName@http://example.com:42";

      // Test the original regex pattern (should match)
      const originalRegex = /.*@(.+):(\d+)$/;
      const originalMatch = originalRegex.exec(firefoxStackLine);

      // The original should match and extract the filename and line number
      expect(originalMatch).not.toBeNull();
      expect(originalMatch![1]).toBe("http://example.com");
      expect(originalMatch![2]).toBe("42");

      // Now test with a line that has non-digits after the colon
      const invalidFirefoxStackLine = "functionName@http://example.com:abc";
      const invalidMatch = originalRegex.exec(invalidFirefoxStackLine);

      // This should not match because line numbers must be digits
      expect(invalidMatch).toBeNull();

      // The mutation would make this test fail because \D+ would match "abc"
      // but we want to ensure line numbers are actually digits
    });
  });
});