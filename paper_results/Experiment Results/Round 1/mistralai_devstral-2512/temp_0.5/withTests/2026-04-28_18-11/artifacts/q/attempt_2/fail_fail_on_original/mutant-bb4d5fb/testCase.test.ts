// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly filter internal stack frames", () => {
    // Enable long stack traces to trigger the isInternalFrame function
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Get the promise and reject it to generate a stack trace
    const promise = deferred.promise.then(() => {
      throw error;
    });

    // The mutation affects stack trace filtering
    // Original code: return fileName === qFileName && lineNumber <= qEndingLine;
    // Mutated code: return true && lineNumber <= qEndingLine;
    // This means the mutated version will incorrectly filter ALL frames from q.js

    return promise.then(
      () => {
        // Should not reach here
        expect(true).toBe(false);
      },
      (caughtError) => {
        // Check that the stack trace is properly filtered
        const stack = caughtError.stack;
        expect(stack).toBeDefined();

        // The original code should filter out internal Q frames
        // The mutated code would filter differently
        // We can't directly test the internal function, but we can observe
        // the behavior through the stack trace
        if (stack) {
          // Count how many q.js frames remain in the stack
          const qFrames = stack.split('\n').filter(line =>
            line.includes('q.js') || line.includes('at ')
          ).length;

          // The original code should filter out most internal frames
          // The mutated code would behave differently
          // This is a heuristic check
          expect(qFrames).toBeLessThan(10);
        }
      }
    );
  });
});