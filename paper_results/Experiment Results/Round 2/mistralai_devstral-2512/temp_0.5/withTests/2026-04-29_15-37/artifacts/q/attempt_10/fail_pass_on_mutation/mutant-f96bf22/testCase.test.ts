import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter out Node.js internal frames from error stacks", async () => {
    // Create a promise chain that will generate Node.js frames
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

      // Look for Node.js internal frames that should be filtered
      const hasNodeFrames = stack.includes("module.js") ||
                          stack.includes("node.js") ||
                          stack.includes("internal/");

      // Original code: should be false (Node frames filtered out)
      // Mutated code: will be true (Node frames included)
      expect(hasNodeFrames).toBe(false);
    }
  });
});