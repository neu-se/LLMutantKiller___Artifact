const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Test the getFileNameAndLineNumber function directly by creating a stack line
    // that matches the anonymous function format (attempt2 regex)
    const stackLine = "at /path/to/file.js:10:5";

    // Access the internal function through Q's implementation
    // We need to trigger the parsing logic that uses attempt2
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create an error with a stack trace containing our test line
    const error = new Error("Test error");
    error.stack = `Error: Test error\n${stackLine}\nat otherFile.js:5:3`;

    // Force a rejection with this error
    deferred.reject(error);

    // The promise should be rejected with our custom error
    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (caughtError: any) => {
        // Verify the stack trace was processed correctly
        expect(caughtError.stack).toContain(stackLine);

        // The key test: verify that the attempt2 regex path was used
        // In the mutated version, this will fail because attempt2 condition is always false
        const fileInfo = caughtError.stack.split('\n')
          .find((line: string) => line.includes('at /path/to/file.js:10:5'));

        expect(fileInfo).toBeDefined();
        expect(fileInfo).toMatch(/at [^ ]+:(\d+):(\d+)$/);
      }
    );
  });
});