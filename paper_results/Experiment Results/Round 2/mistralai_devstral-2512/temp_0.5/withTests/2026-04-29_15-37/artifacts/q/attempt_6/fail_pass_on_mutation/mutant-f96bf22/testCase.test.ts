import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter out internal Q implementation frames", async () => {
    // Create a promise chain that will generate internal frames
    const error = new Error("test error");
    const promise = Q.reject(error)
      .then(() => Q.reject(error))
      .then(() => Q.reject(error));

    try {
      await promise;
      fail("Should have thrown an error");
    } catch (caughtError: unknown) {
      if (!(caughtError instanceof Error)) {
        fail("Expected an Error object");
        return;
      }

      const stack = caughtError.stack;
      if (!stack) {
        fail("Expected a stack trace");
        return;
      }

      // Look for specific Q internal implementation details that should be filtered
      const hasInternalImplementation = stack.includes("q.js") ||
                                     stack.includes("promiseDispatch") ||
                                     stack.includes("Promise.prototype") ||
                                     stack.includes("nextTick");

      // Original code: should be false (internal frames filtered out)
      // Mutated code: will be true (internal frames included)
      expect(hasInternalImplementation).toBe(false);
    }
  });
});