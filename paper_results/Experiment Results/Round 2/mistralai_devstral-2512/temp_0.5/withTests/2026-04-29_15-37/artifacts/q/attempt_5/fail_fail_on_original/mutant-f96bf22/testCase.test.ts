import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter out internal Q frames from error stacks", async () => {
    // Enable long stack traces to ensure we get internal frames
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal Q frames
    const error = new Error("test error");

    // Create multiple levels of promise chaining to generate internal frames
    const promise = Q.reject(error)
      .then(() => Q.reject(error))
      .then(() => Q.reject(error));

    try {
      await promise;
      fail("Should have thrown an error");
    } catch (caughtError) {
      const stack = caughtError.stack;

      if (stack) {
        // Look for the specific pattern that indicates internal Q frames
        // The original code should filter these out, but the mutated code won't
        const hasInternalFrames = stack.includes("From previous event:");

        // Original code: should be false (frames filtered out)
        // Mutated code: will be true (frames included with separator)
        expect(hasInternalFrames).toBe(false);
      }
    } finally {
      // Reset to default
      Q.longStackSupport = false;
    }
  });
});