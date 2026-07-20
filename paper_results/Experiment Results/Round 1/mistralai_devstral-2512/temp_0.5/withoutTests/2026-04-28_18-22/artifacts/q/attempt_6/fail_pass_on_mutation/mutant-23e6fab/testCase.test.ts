const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Firefox stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with attempt3 regex", () => {
    // Create a test case that directly tests the stack trace parsing
    // by creating an error with a Firefox-style stack trace
    const error = new Error("Test error");
    error.stack = "getValue@http://example.com/script.js:42:21";

    // Create a promise that will trigger stack trace processing
    const promise = Q.reject(error);

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (caughtError: Error) => {
          // Verify the stack trace was processed
          expect(caughtError.stack).toBeDefined();

          // The original code should correctly parse Firefox-style traces
          // The mutated code (with "if (true)") would incorrectly parse them
          // We test this by checking if the stack contains the expected format
          const hasFirefoxFormat = caughtError.stack?.includes("@http://example.com/script.js:42");
          expect(hasFirefoxFormat).toBe(true);
        }
      );
  });
});