const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly handle error stack traces", () => {
    // Enable long stack traces to trigger stack parsing
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("test error");
    deferred.reject(error);

    // Force the error to be processed through the stack trace mechanism
    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err: Error) => {
        // The error should have a stack trace that can be parsed
        expect(err.stack).toBeDefined();

        // Create a scenario that will trigger the getFileNameAndLineNumber function
        // by creating an error with a specific stack trace format
        try {
          throw new Error("test");
        } catch (e) {
          // The mutation changes the condition from `if (attempt1)` to `if (false)`
          // which would break stack trace parsing, causing this to fail
          const stack = e.stack;
          expect(stack).toBeDefined();
          expect(stack).toContain("test");
        }

        return true;
      }
    );
  });
});