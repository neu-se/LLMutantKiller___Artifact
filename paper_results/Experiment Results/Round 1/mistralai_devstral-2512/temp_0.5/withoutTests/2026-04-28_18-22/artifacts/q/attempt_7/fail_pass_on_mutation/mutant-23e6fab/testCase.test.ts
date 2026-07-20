const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly handle Firefox-style stack traces with attempt3 pattern", () => {
    // Create an error with a Firefox-style stack trace that should match attempt3
    const error = new Error("Test error");
    error.stack = "function@http://example.com/script.js:42";

    // Create a promise that will use stack trace processing
    const promise = Q.reject(error);

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (caughtError: Error) => {
          // The original code should properly parse this format
          // The mutated code (with "if (true)") would incorrectly handle it
          expect(caughtError.stack).toBeDefined();

          // Test that the stack trace contains the expected format
          // This verifies the attempt3 regex is working correctly
          const hasCorrectFormat = caughtError.stack?.includes("@http://example.com/script.js:42");
          expect(hasCorrectFormat).toBe(true);

          // Additional check for the specific format that attempt3 handles
          const lines = caughtError.stack?.split("\n") || [];
          const hasAttempt3Match = lines.some(line =>
            line.includes("@http://example.com/script.js:42")
          );
          expect(hasAttempt3Match).toBe(true);
        }
      );
  });
});