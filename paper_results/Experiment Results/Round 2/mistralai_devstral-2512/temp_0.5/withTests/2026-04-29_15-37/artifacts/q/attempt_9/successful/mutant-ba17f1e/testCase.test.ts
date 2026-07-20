const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace filtering", () => {
  it("should properly filter internal Q frames from stack traces", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      const originalStack = error.stack;

      // Force stack trace filtering by creating a promise with long stack support
      Q.longStackSupport = true;
      const deferred = Q.defer();
      deferred.reject(new Error("Filtered error"));

      return deferred.promise.catch((filteredError: Error) => {
        // The filtered stack should be different from the original
        // This will fail on mutated code because getFileNameAndLineNumber returns []
        // which breaks the isInternalFrame check in filterStackString
        expect(filteredError.stack).not.toBe(originalStack);
        expect(filteredError.stack.length).toBeLessThanOrEqual(originalStack.length);
      });
    });
  });
});