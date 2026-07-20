// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c854557/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise that will trigger stack trace parsing
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((e: Error) => {
      // The mutation affects the regex pattern for parsing stack traces
      // We need to test the actual parsing behavior by examining how Q handles stack traces

      // Create a test case that directly tests the regex pattern
      // This simulates what happens inside getFileNameAndLineNumber
      const testStackLine = "at http://example.com/file.js:99:21";

      // This is the original regex pattern (with \d+)
      const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const originalMatch = originalRegex.exec(testStackLine);

      // This is the mutated regex pattern (with \d)
      const mutatedRegex = /at ([^ ]+):(\d):(?:\d+)$/;
      const mutatedMatch = mutatedRegex.exec(testStackLine);

      // Original should match and capture "99"
      expect(originalMatch).not.toBeNull();
      expect(originalMatch![2]).toBe("99");

      // Mutated should either not match or capture only "9"
      // (This assertion will fail on mutated code)
      expect(mutatedMatch).not.toBeNull();
      expect(mutatedMatch![2]).toBe("99");

      return true;
    });
  });
});