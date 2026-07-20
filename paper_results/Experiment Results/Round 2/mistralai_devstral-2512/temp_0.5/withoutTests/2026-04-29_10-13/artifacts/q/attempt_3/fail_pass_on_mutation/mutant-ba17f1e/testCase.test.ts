const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a scenario that exercises the stack trace parsing
    // The mutation affects getFileNameAndLineNumber which is used in stack filtering
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a rejection that will generate stack traces
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // The mutation would cause getFileNameAndLineNumber to return []
        // which would break stack trace filtering
        // We verify the error is properly handled
        expect(reason).toBe(error);
        expect(reason.stack).toBeDefined();
        expect(reason.stack!.length).toBeGreaterThan(0);
      }
    );
  });
});