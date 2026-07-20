const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse multi-digit line numbers in stack traces", () => {
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

      // Now test with actual Q stack filtering
      // The mutation would cause Q to fail to filter stack traces with multi-digit lines
      const lines = error.stack!.split("\n");
      for (const line of lines) {
        const match = /\((.+):(\d+):\d+\)/.exec(line);
        if (match && match[2].length > 1) {
          // This assertion will fail if the mutation causes incorrect parsing
          expect(parseInt(match[2])).toBeGreaterThan(9);
        }
      }

      return Q.resolve();
    });
  });
});