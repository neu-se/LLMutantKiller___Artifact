// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly filter stack frames from q.js", () => {
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
          // Count q.js frames in the stack
          const qFrames = stack.split('\n').filter((line: string) =>
            line.includes('q.js')
          ).length;

          // Count total frames
          const totalFrames = stack.split('\n').filter((line: string) =>
            line.includes('at ')
          ).length;

          // In the original code, most q.js frames should be filtered out
          // In the mutated code, ALL q.js frames would be filtered (return true && ...)
          // So the ratio should be different

          // Original: qFrames should be a small percentage of total
          // Mutated: qFrames should be 0 (all filtered out)
          expect(qFrames).toBeGreaterThan(0);

          // This is the key assertion that will fail on mutated code
          // The mutated version filters out ALL q.js frames incorrectly
          const qRatio = qFrames / totalFrames;
          expect(qRatio).toBeGreaterThan(0.1);
        }
      }
    );
  });
});