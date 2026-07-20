const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from error stacks", () => {
    // Enable long stack traces to ensure internal frames are generated
    Q.longStackSupport = true;

    // Create a deep promise chain to generate multiple internal frames
    const error = new Error("test error");
    let promise = Q.reject(error);

    // Add multiple then() calls to create more stack frames
    for (let i = 0; i < 5; i++) {
      promise = promise.then(() => {
        throw error;
      });
    }

    return promise
      .catch((e: any) => {
        const stack = e.stack;
        expect(stack).toBeDefined();

        // Count internal Q frames by looking for specific function names
        const internalFrames = stack.split('\n').filter((line: string) =>
          line.includes('q.js') &&
          (line.includes('isInternalFrame') ||
           line.includes('promiseDispatch') ||
           line.includes('makeStackTraceLong'))
        );

        // In original code, these should be filtered (0)
        // In mutated code (with true &&), they remain (>0)
        expect(internalFrames.length).toBe(0);

        // Verify error message is preserved
        expect(e.message).toBe("test error");
        return Q.resolve();
      });
  });
});