// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly filter internal stack frames", () => {
    // Enable long stack traces to trigger the isInternalFrame function
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a nested promise chain to generate more stack frames
    const promise = deferred.promise
      .then(() => {
        return Q.delay(1);
      })
      .then(() => {
        throw error;
      });

    // Reject the deferred to trigger the error handling
    deferred.reject(error);

    return promise.then(
      () => {
        // Should not reach here
        expect(true).toBe(false);
      },
      (caughtError: Error) => {
        const stack = caughtError.stack;
        expect(stack).toBeDefined();

        if (stack) {
          // The mutation changes the condition from:
          // return fileName === qFileName && lineNumber <= qEndingLine;
          // to:
          // return true && lineNumber <= qEndingLine;

          // This means the mutated version will incorrectly mark ALL frames
          // as internal if they're within the line number range, regardless of filename

          // Count all stack frames
          const allFrames = stack.split('\n').filter((line: string) =>
            line.includes('at ')
          ).length;

          // Count q.js frames
          const qFrames = stack.split('\n').filter((line: string) =>
            line.includes('q.js')
          ).length;

          // In the original code, q.js frames should be filtered out
          // In the mutated code, ALL frames (including non-q.js) would be filtered
          // So the ratio should be very different

          // Original: qFrames should be much less than allFrames
          // Mutated: qFrames should be close to allFrames (all filtered)
          const ratio = qFrames / allFrames;
          expect(ratio).toBeLessThan(0.5);
        }
      }
    );
  });
});