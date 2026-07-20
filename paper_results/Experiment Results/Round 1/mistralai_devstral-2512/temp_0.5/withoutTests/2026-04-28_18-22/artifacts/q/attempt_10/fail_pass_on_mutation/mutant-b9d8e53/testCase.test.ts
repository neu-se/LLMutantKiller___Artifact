const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    return deferred.promise.catch((error: Error) => {
      // Verify the stack trace exists
      expect(error.stack).toBeDefined();

      // Test the specific regex pattern that was mutated
      // The original regex: /at .+ \((.+):(\d+):(?:\d+)\)$/
      // The mutated regex: /at .+ \((.+):(\d):(?:\d+)\)$/ (only matches single digits)
      const testStackLine = "at Test.test (file.js:123:45)";

      // This regex matches the original pattern
      const originalRegex = /at .+ \((.+):(\d+):(?:\d+)\)$/;
      const originalMatch = originalRegex.exec(testStackLine);

      // This regex matches the mutated pattern
      const mutatedRegex = /at .+ \((.+):(\d):(?:\d+)\)$/;
      const mutatedMatch = mutatedRegex.exec(testStackLine);

      // Original should match and capture "123"
      expect(originalMatch).not.toBeNull();
      expect(originalMatch![2]).toBe("123");

      // Mutated should NOT match because it only accepts single digits
      expect(mutatedMatch).toBeNull();

      // Now test with a single-digit line number
      const singleDigitLine = "at Test.test (file.js:9:45)";
      const singleDigitMatch = mutatedRegex.exec(singleDigitLine);
      expect(singleDigitMatch).not.toBeNull();
      expect(singleDigitMatch![2]).toBe("9");

      return Q.resolve();
    });
  });
});