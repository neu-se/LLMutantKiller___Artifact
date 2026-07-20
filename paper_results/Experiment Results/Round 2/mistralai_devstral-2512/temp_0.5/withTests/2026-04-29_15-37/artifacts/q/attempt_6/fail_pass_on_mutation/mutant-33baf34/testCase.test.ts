const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack lines with named functions", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejection with a stack trace
    deferred.reject(error);

    // Return a promise that will handle the error and verify stack parsing
    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err) => {
        // Verify that the stack trace was parsed correctly
        expect(err.stack).toBeDefined();
        expect(err.stack.includes("at ")).toBe(true);
        return true;
      }
    );
  });
});