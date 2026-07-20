import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter out Q internal implementation details from stack traces", async () => {
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

      // Look for specific patterns that indicate internal Q implementation
      // These should be filtered out in the original code but present in mutated code
      const hasQInternalPatterns = stack.includes("q.js") ||
                                stack.includes("promiseDispatch") ||
                                stack.includes("Promise.prototype") ||
                                stack.includes("nextTick") ||
                                stack.includes("makeStackTraceLong");

      // Original code: should be false (patterns filtered out)
      // Mutated code: will be true (patterns included)
      expect(hasQInternalPatterns).toBe(false);
    }
  });
});