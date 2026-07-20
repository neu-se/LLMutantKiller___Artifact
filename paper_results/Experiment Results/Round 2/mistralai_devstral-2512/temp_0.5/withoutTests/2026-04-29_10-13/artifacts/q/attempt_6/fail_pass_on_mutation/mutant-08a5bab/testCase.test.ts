const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve non-internal stack frames in error stacks", () => {
    // Create a custom error with a specific stack trace
    const error = new Error("Test error");
    const originalStack = error.stack;

    // Create a rejected promise that will go through Q's stack filtering
    const deferred = Q.defer();
    deferred.reject(error);

    // Force handling of the promise to trigger stack filtering
    return deferred.promise.catch((e: any) => {
      // In the mutated version, all frames are considered internal
      // so the stack should be filtered to nothing
      // In the original version, non-Q frames should remain
      if (e.stack === "" || e.stack === undefined) {
        throw new Error("Stack trace was completely filtered - mutation detected");
      }
      return true;
    });
  });
});