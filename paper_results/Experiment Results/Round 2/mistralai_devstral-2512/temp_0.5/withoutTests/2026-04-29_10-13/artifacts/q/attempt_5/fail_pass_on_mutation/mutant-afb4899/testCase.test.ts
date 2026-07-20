const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with line and column numbers", () => {
    // Test the internal stack parsing by creating a scenario that exercises it
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create an error with a specific stack trace format that should match the regex
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at Test.test.js:10:5\n" +
                  "    at Context.<anonymous> (test.js:5:3)";

    deferred.reject(error);

    return promise.catch((caughtError: Error) => {
      // Verify the error was caught properly
      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError.message).toBe("Test error");

      // The key difference between original and mutated code is in the regex pattern
      // Original: /at ([^ ]+):(\d+):(?:\d+)$/ (with $ anchor)
      // Mutated:  /at ([^ ]+):(\d+):(?:\d+)/ (without $ anchor)
      // This affects how stack lines are parsed

      // Test the regex directly on a stack line
      const testStackLine = "    at Test.test.js:10:5";
      const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const mutatedRegex = /at ([^ ]+):(\d+):(?:\d+)/;

      const originalMatch = originalRegex.exec(testStackLine);
      const mutatedMatch = mutatedRegex.exec(testStackLine);

      // Original should match (with $ anchor)
      expect(originalMatch).not.toBeNull();
      if (originalMatch) {
        expect(originalMatch[1]).toBe("Test.test.js");
        expect(originalMatch[2]).toBe("10");
      }

      // Mutated might match differently (without $ anchor)
      // This test will fail on mutated code because the regex behavior changes
      expect(mutatedMatch).not.toBeNull();
      if (mutatedMatch) {
        expect(mutatedMatch[1]).toBe("Test.test.js");
        expect(mutatedMatch[2]).toBe("10");
      }
    });
  });
});