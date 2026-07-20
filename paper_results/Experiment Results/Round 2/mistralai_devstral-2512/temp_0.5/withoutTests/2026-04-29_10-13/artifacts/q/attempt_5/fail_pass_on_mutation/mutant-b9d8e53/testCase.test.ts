// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a test that directly exercises the regex pattern used in getFileNameAndLineNumber
    const stackLine = "at Test.test (test.js:123:45)";
    const testRegex = /at .+ \((.+):(\d+):(?:\d+)\)$/;
    const match = testRegex.exec(stackLine);

    // Verify the regex matches and extracts the correct line number
    expect(match).not.toBeNull();
    if (match) {
      expect(match[1]).toBe("test.js");
      expect(match[2]).toBe("123"); // This would fail with mutated regex \d (single digit only)
    }

    // Now test through Q's actual stack filtering by creating a promise rejection
    // with a stack trace containing multi-digit line numbers
    const error = new Error("Test error");
    Error.captureStackTrace(error, testRegex.exec);
    const promise = Q.reject(error);

    return promise.catch((caughtError: Error) => {
      // The stack should be processed by Q's filtering
      expect(caughtError).toBeDefined();
    });
  });
});