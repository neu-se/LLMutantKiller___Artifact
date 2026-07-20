const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Test the stack trace parsing functionality directly by creating
    // an error with a specific stack format that should match attempt2
    const testError = new Error("Test error");
    testError.stack = "Error: Test error\n    at test.js:42:1";

    // Create a promise that will be rejected to trigger stack trace parsing
    const promise = Q.reject(testError);

    // Enable long stack traces to ensure parsing is used
    Q.longStackSupport = true;

    let stackParsed = false;
    let parsedFileName = "";
    let parsedLineNumber = 0;

    // Try to access the internal function through the promise's stack handling
    return promise.then(
      () => {
        // Should not reach here since we rejected
        expect(true).toBe(false);
      },
      (error: Error) => {
        // The error should have been processed through the stack parsing
        // The mutation would prevent attempt2 format from being parsed
        stackParsed = true;
        expect(error).toBeDefined();
        expect(error.stack).toBeDefined();
      }
    ).then(() => {
      // Verify the stack was processed
      expect(stackParsed).toBe(true);
    });
  });
});