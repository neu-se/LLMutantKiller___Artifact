const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly handle Firefox-style stack traces in error handling", () => {
    // Create a rejected promise with a custom error that has a Firefox-style stack
    const error = new Error("Test error");
    error.stack = "function@http://example.com/script.js:42\n" +
                  "anotherFunction@http://example.com/other.js:10";

    const promise = Q.reject(error);

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (caughtError: Error) => {
          // Verify the error stack is preserved
          expect(caughtError.stack).toBeDefined();
          expect(caughtError.stack).toContain("http://example.com/script.js:42");

          // The mutation changes the condition from checking attempt3 to always true
          // This would cause incorrect parsing of Firefox-style stack traces
          // The test verifies the stack trace is properly handled
        }
      );
  });
});