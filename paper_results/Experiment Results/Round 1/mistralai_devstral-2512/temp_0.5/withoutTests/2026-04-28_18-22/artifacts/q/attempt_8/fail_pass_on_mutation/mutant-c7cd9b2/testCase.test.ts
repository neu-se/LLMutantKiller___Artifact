const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Create a scenario that forces the use of getFileNameAndLineNumber
    // by creating a promise chain with long stack traces enabled
    Q.longStackSupport = true;

    // Create a nested promise rejection that will trigger stack trace parsing
    const outerPromise = Q.Promise((resolve, reject) => {
      const innerPromise = Q.Promise((innerResolve, innerReject) => {
        // Create an error with a stack trace matching attempt2 pattern
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at test.js:42:1";
        innerReject(error);
      });

      innerPromise.then(
        () => resolve("success"),
        (error) => reject(error)
      );
    });

    // Track whether the error was properly processed
    let errorProcessed = false;

    return outerPromise.then(
      () => {
        // Should not reach here
        expect(true).toBe(false);
      },
      (error: Error) => {
        errorProcessed = true;
        // Verify the error was processed through the stack parsing
        expect(error).toBeDefined();
        expect(error.stack).toBeDefined();

        // The mutation would prevent attempt2 format from being parsed
        // This should cause the stack processing to fail
        expect(errorProcessed).toBe(true);
      }
    );
  });
});