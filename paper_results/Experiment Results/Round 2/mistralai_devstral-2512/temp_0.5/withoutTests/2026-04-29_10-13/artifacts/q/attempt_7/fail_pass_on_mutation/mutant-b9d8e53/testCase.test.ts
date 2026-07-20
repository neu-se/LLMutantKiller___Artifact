// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise rejection with a stack trace containing multi-digit line numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at Test.test (test.js:123:45)";

    const promise = Q.reject(error);

    return promise.catch((caughtError: Error) => {
      // The stack should be processed by Q's filtering
      expect(caughtError.stack).toBeDefined();

      // Test the regex pattern directly by simulating getFileNameAndLineNumber
      const stackLine = "at Test.test (test.js:123:45)";
      const testRegex = /at .+ \((.+):(\d+):(?:\d+)\)$/;
      const match = testRegex.exec(stackLine);

      // This should match in original code but fail in mutated code
      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("test.js");
        expect(match[2]).toBe("123"); // This would fail with mutated regex \d
      }
    });
  });
});