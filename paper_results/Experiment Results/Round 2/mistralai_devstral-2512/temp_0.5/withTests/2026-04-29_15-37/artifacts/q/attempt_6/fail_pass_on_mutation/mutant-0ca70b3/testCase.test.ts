const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should correctly filter stack traces by removing internal frames", () => {
    // Create a scenario that will generate a stack trace with internal frames
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a promise chain that will generate stack frames
    deferred.promise.then(() => {
      throw error;
    });

    // Reject immediately to trigger the error handling
    deferred.reject(error);

    return deferred.promise.catch((e: Error) => {
      // The stack should be filtered to remove internal Q frames
      const stack = e.stack || "";
      const stackLines = stack.split('\n');
      const hasInternalFrames = stackLines.some(line =>
        line.includes('q.js') || line.includes('filterStackString')
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code, the loop won't execute so no filtering occurs
      expect(hasInternalFrames).toBe(false);
    });
  });
});