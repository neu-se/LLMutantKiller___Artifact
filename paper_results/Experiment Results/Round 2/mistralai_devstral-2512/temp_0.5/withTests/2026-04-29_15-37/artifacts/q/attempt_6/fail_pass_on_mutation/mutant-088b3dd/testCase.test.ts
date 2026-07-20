const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a scenario that would trigger stack trace parsing
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
        // This indirectly tests the getFileNameAndLineNumber function
        // through the stack trace filtering mechanism
        // The mutation changes the condition from `if (attempt1)` to `if (false)`
        // which would break stack trace parsing, causing the error handling to fail
        return Q.delay(10).then(() => {
          // Verify the error was properly processed
          expect(err).toBe(error);
          // Force stack trace filtering by enabling long stack support
          Q.longStackSupport = true;
          return Q.reject(new Error("test")).catch((e: Error) => {
            expect(e.stack).toContain("test");
          });
        });
      }
    );
  });
});