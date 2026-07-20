const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should correctly filter stack traces by removing internal frames", () => {
    // Create a scenario that will generate a stack trace with internal frames
    Q.longStackSupport = true;

    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a chain of promises that will generate stack frames
    deferred1.promise.then(() => {
      return deferred2.promise;
    });

    // Reject with an error to trigger stack trace filtering
    const error = new Error("Test error");
    deferred2.reject(error);

    return deferred1.promise.catch((e: Error) => {
      // The stack should be filtered to remove internal Q frames
      const stackLines = e.stack.split('\n');
      const hasInternalFrames = stackLines.some(line =>
        line.includes('q.js') || line.includes('filterStackString')
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code, the loop won't execute so no filtering occurs
      expect(hasInternalFrames).toBe(false);
    });
  });
});