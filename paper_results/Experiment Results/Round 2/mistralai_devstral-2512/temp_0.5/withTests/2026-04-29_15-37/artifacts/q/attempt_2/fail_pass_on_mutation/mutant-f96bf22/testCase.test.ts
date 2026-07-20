import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter internal Q frames from error stacks", async () => {
    // Create a promise that will generate a stack trace with internal frames
    const error = new Error("test error");
    const deferred = Q.defer();
    deferred.reject(error);

    // Handle the rejection and check the stack trace
    try {
      await deferred.promise;
      fail("Should have thrown an error");
    } catch (caughtError) {
      const stack = caughtError.stack;

      // In the original code, internal Q frames should be filtered out
      // In the mutated code, they will be included
      if (stack) {
        const hasInternalFrames = stack.includes("q.js") ||
                                 stack.includes("promiseDispatch") ||
                                 stack.includes("Promise.prototype");

        // Original code should filter these out (false)
        // Mutated code will include them (true)
        expect(hasInternalFrames).toBe(false);
      }
    }
  });
});