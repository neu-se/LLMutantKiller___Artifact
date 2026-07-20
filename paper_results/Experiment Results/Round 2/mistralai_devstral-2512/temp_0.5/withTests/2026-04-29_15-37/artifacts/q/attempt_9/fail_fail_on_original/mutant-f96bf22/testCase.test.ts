import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter out internal Q frames from error stacks", async () => {
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

      // Look for the specific pattern that indicates Q internal frames
      // The original code should filter these out, but the mutated code won't
      const hasQInternalFrames = stack.includes("at Q.") ||
                                stack.includes("at Promise.") ||
                                stack.includes("at defer.") ||
                                stack.includes("at nextTick");

      // Original code: should be false (frames filtered out)
      // Mutated code: will be true (frames included)
      expect(hasQInternalFrames).toBe(false);
    }
  });
});