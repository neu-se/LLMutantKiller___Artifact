const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from error stacks", () => {
    // Create a promise that will generate a stack trace with internal frames
    const promise = Q.reject(new Error("test error"));

    return promise
      .catch((error: any) => {
        const stack = error.stack;
        expect(stack).toBeDefined();

        // Count lines containing "q.js" that are internal frames
        const internalFrames = stack.split('\n').filter((line: string) =>
          line.includes('q.js') &&
          (line.includes('isInternalFrame') ||
           line.includes('makeStackTraceLong') ||
           line.includes('promiseDispatch'))
        ).length;

        // In original code, these internal frames should be filtered out
        // In mutated code (with true && condition), they remain
        // Original should have 0 internal frames, mutated will have several
        expect(internalFrames).toBe(0);

        // Also verify the error itself is correct
        expect(error.message).toBe("test error");
        return Q.resolve();
      });
  });
});