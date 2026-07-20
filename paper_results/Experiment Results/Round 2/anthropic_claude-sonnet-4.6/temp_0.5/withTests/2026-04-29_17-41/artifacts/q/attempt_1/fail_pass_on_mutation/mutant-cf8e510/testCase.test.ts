import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong behavior with long stack support", () => {
  it("should not modify error stack when promise has no stack property", async () => {
    Q.longStackSupport = true;

    try {
      // Create a promise without a stack property by using a raw Promise constructor
      // We need a promise that has no .stack property
      const deferred = Q.defer();
      
      // Remove the stack property from the promise to simulate a promise without stack
      delete (deferred.promise as any).stack;
      
      const error = new Error("test error");
      const originalStack = error.stack;

      // Reject the promise with the error
      deferred.reject(error);

      let caughtError: Error | null = null;
      
      await new Promise<void>((resolve) => {
        deferred.promise.then(
          null,
          function(err: Error) {
            caughtError = err;
            resolve();
          }
        );
      });

      // The error stack should not have been modified with long stack trace separator
      // when the promise has no stack property
      // In the original code: condition requires promise.stack to be truthy
      // In the mutated code: condition can be true even without promise.stack (if error is object)
      expect(caughtError).not.toBeNull();
      
      // With original code: since promise.stack is falsy, makeStackTraceLong does nothing
      // With mutated code: since error is an object, makeStackTraceLong runs but
      // promise.stack is undefined, so the separator logic behaves differently
      const stack = (caughtError as any).stack;
      
      // The stack should equal the original stack (no modification)
      // because promise.stack was not set
      expect(stack).toBe(originalStack);
    } finally {
      Q.longStackSupport = false;
    }
  });
});