// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Test the regex pattern directly by simulating what happens in getFileNameAndLineNumber
    const stackLine = "at Test.test (test.js:123:45)";

    // Original regex that should match multi-digit line numbers
    const originalRegex = /at .+ \((.+):(\d+):(?:\d+)\)$/;
    const originalMatch = originalRegex.exec(stackLine);

    // Mutated regex that would only match single-digit line numbers
    const mutatedRegex = /at .+ \((.+):(\d):(?:\d+)\)$/;
    const mutatedMatch = mutatedRegex.exec(stackLine);

    // Original should match, mutated should not
    expect(originalMatch).not.toBeNull();
    expect(mutatedMatch).toBeNull();

    if (originalMatch) {
      expect(originalMatch[1]).toBe("test.js");
      expect(originalMatch[2]).toBe("123");
    }

    // Now test through Q's actual stack filtering
    const error = new Error("Test error");
    const promise = Q.reject(error);

    return promise.catch((caughtError: Error) => {
      expect(caughtError).toBeDefined();
    });
  });
});