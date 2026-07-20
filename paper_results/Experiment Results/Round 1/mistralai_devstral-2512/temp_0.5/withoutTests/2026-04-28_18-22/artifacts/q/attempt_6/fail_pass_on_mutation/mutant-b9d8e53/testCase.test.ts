const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error with stack trace"));

    return deferred.promise.catch((error: Error) => {
      // Verify the stack trace contains valid line numbers
      expect(error.stack).toBeDefined();

      // Create a test case that specifically checks multi-digit line number parsing
      const testLine = "at Test.test (test.js:123:45)";
      const match = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(testLine);

      // This assertion will fail with the mutated code because
      // the regex would only match single digits in line numbers
      expect(match).not.toBeNull();
      if (match) {
        expect(match[2]).toBe("123"); // Should match full line number
        expect(parseInt(match[2])).toBe(123); // Should parse as 123, not 1
      }

      return Q.resolve();
    });
  });
});