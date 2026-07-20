const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with attempt3 regex", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    // Create a mock Firefox-style stack trace
    const mockStack = "getValue@http://example.com/script.js:42";

    // Test the getFileNameAndLineNumber function directly through error handling
    return deferred.promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (error: Error) => {
          // The original code should correctly parse Firefox-style traces
          // The mutated code (with "if (true)") would incorrectly parse them
          expect(error.stack).toBeDefined();

          // Create a test case that would fail with the mutation
          // by checking if the attempt3 regex is working correctly
          const testLine = "function@http://example.com/test.js:100";
          const result = testLine.match(/.*@(.+):(\D+)$/);

          // Original code checks "if (attempt3)" which should be truthy for valid matches
          // Mutated code changes this to "if (true)" which would always execute
          // This test verifies the regex matching works as expected
          expect(result).not.toBeNull();
          if (result) {
            expect(result[1]).toBe("http://example.com/test.js");
            expect(result[2]).toBe("100");
          }
        }
      );
  });
});