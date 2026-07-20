const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from error stacks", () => {
    // Enable long stack traces to ensure internal frames are generated
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const error = new Error("test error");
    const promise = Q.reject(error);

    return promise
      .catch((e: any) => {
        const stack = e.stack;
        expect(stack).toBeDefined();

        // Count lines that contain "q.js" and specific internal function names
        const internalFrames = stack.split('\n').filter((line: string) =>
          line.includes('q.js') &&
          (line.includes('isInternalFrame') ||
           line.includes('captureLine') ||
           line.includes('filterStackString') ||
           line.includes('makeStackTraceLong') ||
           line.includes('promiseDispatch'))
        );

        // In original code, these internal frames should be filtered (0)
        // In mutated code (with true &&), they remain (>0)
        // This is the key difference that will fail on mutated code
        expect(internalFrames.length).toBe(0);

        // Verify error message is preserved
        expect(e.message).toBe("test error");
        return Q.resolve();
      });
  });
});