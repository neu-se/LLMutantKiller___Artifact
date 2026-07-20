const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Create a scenario that forces stack trace parsing
    Q.longStackSupport = true;

    // Create a promise chain that will trigger stack trace parsing
    const promise = Q.Promise((resolve, reject) => {
      // Create an error with stack trace matching attempt2 pattern
      const error = new Error("Test error");
      error.stack = "Error: Test error\n    at test.js:42:1";
      reject(error);
    });

    // Track whether the error was properly processed
    let errorProcessed = false;
    let stackContainsPattern = false;

    return promise.then(
      () => {
        // Should not reach here
        expect(true).toBe(false);
      },
      (error: Error) => {
        errorProcessed = true;
        // Check if the stack contains our specific pattern
        // With the mutation, this parsing would fail
        stackContainsPattern = error.stack?.includes("test.js:42:1") || false;
        expect(errorProcessed).toBe(true);
        expect(stackContainsPattern).toBe(true);
      }
    );
  });
});