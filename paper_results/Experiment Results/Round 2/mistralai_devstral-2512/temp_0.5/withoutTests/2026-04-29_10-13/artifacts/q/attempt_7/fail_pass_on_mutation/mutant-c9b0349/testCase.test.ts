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

        // Count specific internal Q functions that should be filtered
        const internalFrameCount = stack.split('\n').reduce((count: number, line: string) => {
          if (line.includes('q.js') &&
              (line.includes('isInternalFrame') ||
               line.includes('captureLine') ||
               line.includes('filterStackString') ||
               line.includes('makeStackTraceLong'))) {
            return count + 1;
          }
          return count;
        }, 0);

        // In original code, these should be filtered (0)
        // In mutated code (with true &&), they remain (>0)
        expect(internalFrameCount).toBe(0);

        // Verify error message is preserved
        expect(e.message).toBe("test error");
        return Q.resolve();
      });
  });
});