import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering behavior", () => {
  it("should filter out internal Q frames from error stacks", async () => {
    // Create a promise chain that will generate internal Q frames
    const error = new Error("test error");

    // First rejection
    const promise1 = Q.reject(error);

    // Chain another rejection to add more internal frames
    const promise2 = promise1.then(() => {
      return Q.reject(error);
    });

    try {
      await promise2;
      fail("Should have thrown an error");
    } catch (caughtError) {
      const stack = caughtError.stack;

      if (stack) {
        // Look for specific patterns that indicate internal Q frames
        const hasQInternalFrames = stack.includes("q.js") ||
                                 stack.includes("promiseDispatch") ||
                                 stack.includes("Promise.prototype") ||
                                 stack.includes("nextTick") ||
                                 stack.includes("makeStackTraceLong");

        // Original code: should be false (frames filtered out)
        // Mutated code: will be true (frames included)
        expect(hasQInternalFrames).toBe(false);
      }
    }
  });
});