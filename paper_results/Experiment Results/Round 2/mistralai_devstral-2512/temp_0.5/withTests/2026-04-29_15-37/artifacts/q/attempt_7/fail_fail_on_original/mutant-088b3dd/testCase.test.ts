const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
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

        // Create another error to test stack trace parsing directly
        const testError = new Error("test");
        const stackLine = "at functionName (filename.js:42:24)";

        // Access the internal function through the Q module
        // This will fail if the mutation breaks the parsing logic
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename.js", 42]);

        return true;
      }
    );
  });
});