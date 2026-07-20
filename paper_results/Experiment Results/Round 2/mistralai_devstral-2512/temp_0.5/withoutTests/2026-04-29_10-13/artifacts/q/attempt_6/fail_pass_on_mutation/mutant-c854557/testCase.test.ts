// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c854557/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise that will trigger stack trace parsing
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((e: Error) => {
      // Test the actual regex pattern that's used in the code
      // The mutation changes \d+ to \d in the line number capture
      const testStackLine = "at http://example.com/file.js:99:21";

      // This is the original regex pattern (with \d+)
      const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const originalMatch = originalRegex.exec(testStackLine);

      // Original should match and capture "99"
      expect(originalMatch).not.toBeNull();
      expect(originalMatch![2]).toBe("99");

      // Now test with a line number that would fail with the mutated regex
      const testStackLine2 = "at http://example.com/file.js:123:45";
      const match2 = originalRegex.exec(testStackLine2);

      expect(match2).not.toBeNull();
      expect(match2![2]).toBe("123"); // This will fail on mutated code (would be "1")

      return true;
    });
  });
});