const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from error stacks", () => {
    // Create a promise chain that will generate internal stack frames
    const error = new Error("test error");
    const promise = Q.reject(error);

    return promise
      .catch((e: any) => {
        const stack = e.stack;
        expect(stack).toBeDefined();

        // Check for specific internal Q functions that should be filtered
        const hasInternalFrames = stack.split('\n').some((line: string) =>
          line.includes('q.js') &&
          (line.includes('isInternalFrame') ||
           line.includes('captureLine') ||
           line.includes('filterStackString'))
        );

        // In original code, these should be filtered (false)
        // In mutated code (with true &&), they remain (true)
        expect(hasInternalFrames).toBe(false);

        // Verify error message is preserved
        expect(e.message).toBe("test error");
        return Q.resolve();
      });
  });
});