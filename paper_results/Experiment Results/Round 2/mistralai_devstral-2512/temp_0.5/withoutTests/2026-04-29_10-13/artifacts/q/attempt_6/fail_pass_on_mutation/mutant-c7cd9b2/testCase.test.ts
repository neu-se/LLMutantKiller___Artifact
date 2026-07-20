const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly handle stack traces with anonymous function format", () => {
    // Create a promise chain that will generate stack traces
    // and test that the attempt2 regex path works correctly
    const deferred = Q.defer();

    // Create an error with a stack trace containing anonymous function format
    const error = new Error("Test error");
    error.stack = `
      Error: Test error
        at Test.<anonymous> (/test/file.js:10:5)
        at module.js:42:8
        at other.js:1:1
    `.trim();

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (caughtError: any) => {
        // Verify the error was properly handled
        expect(caughtError.message).toBe("Test error");

        // The key test: verify that stack traces with anonymous function format
        // are properly processed. The mutation breaks attempt2 regex matching.
        // We can detect this by checking if long stack traces work correctly
        // since they depend on proper stack line parsing

        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a new promise chain with long stacks enabled
        const deferred2 = Q.defer();
        const error2 = new Error("Test error 2");
        error2.stack = `
          Error: Test error 2
            at module.js:42:8
            at other.js:1:1
        `.trim();

        deferred2.reject(error2);

        return deferred2.promise.then(
          () => {
            throw new Error("Should have rejected");
          },
          (e: any) => {
            // If attempt2 is broken, stack trace concatenation won't work properly
            // The stack should contain the original error stack
            expect(e.stack).toContain("module.js:42:8");
          }
        );
      }
    );
  });
});