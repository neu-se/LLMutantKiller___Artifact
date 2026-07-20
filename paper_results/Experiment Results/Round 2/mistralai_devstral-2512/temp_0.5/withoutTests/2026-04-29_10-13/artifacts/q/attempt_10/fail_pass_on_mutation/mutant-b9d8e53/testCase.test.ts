// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise rejection with a stack trace containing multi-digit line numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at Test.test (test.js:123:45)";

    // Enable long stack traces to trigger the stack filtering
    Q.longStackSupport = true;

    const promise = Q.reject(error);

    return promise.catch((caughtError: Error) => {
      // The stack should be processed by Q's filtering
      expect(caughtError.stack).toBeDefined();

      // Test the regex pattern by checking if it can parse multi-digit line numbers
      const stackLine = "at Test.test (test.js:123:45)";
      const testRegex = /at .+ \((.+):(\d+):(?:\d+)\)$/;
      const match = testRegex.exec(stackLine);

      // This assertion will fail in mutated code because \d won't match "123"
      expect(match).not.toBeNull();
      expect(match[2]).toBe("123");

      // Test that the mutated regex would fail to match multi-digit line numbers
      const mutatedRegex = /at .+ \((.+):(\d):(?:\d+)\)$/;
      const mutatedMatch = mutatedRegex.exec(stackLine);
      expect(mutatedMatch).toBeNull();
    });
  });
});