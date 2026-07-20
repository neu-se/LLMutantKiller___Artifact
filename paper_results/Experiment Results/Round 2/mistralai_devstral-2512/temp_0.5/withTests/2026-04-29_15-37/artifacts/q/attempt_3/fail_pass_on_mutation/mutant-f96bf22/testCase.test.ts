import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should properly filter stack traces by excluding internal frames", async () => {
    // Create a scenario that will generate a stack trace with internal Q frames
    const error = new Error("test error");

    // Create a promise chain that will add Q internal frames to the stack
    const promise = Q.reject(error)
      .then(() => {
        // This will add internal Q frames to the stack
        return Q.reject(error);
      });

    try {
      await promise;
      fail("Should have thrown an error");
    } catch (caughtError) {
      const stack = caughtError.stack;

      // The key difference between original and mutated code:
      // Original: filters out internal Q frames (should not contain "q.js")
      // Mutated: includes all frames (will contain "q.js")

      if (stack) {
        // Count how many lines contain "q.js" - this should be 0 in original, >0 in mutated
        const qLines = stack.split('\n').filter(line => line.includes('q.js')).length;

        // Original code should have filtered out all q.js lines
        // Mutated code will have kept them
        expect(qLines).toBe(0);
      }
    }
  });
});