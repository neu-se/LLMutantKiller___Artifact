// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should preserve non-q.js stack frames in error traces", () => {
    // Enable long stack traces to trigger the isInternalFrame function
    Q.longStackSupport = true;

    // Create a custom error with a specific stack trace pattern
    const error = new Error("Test error");

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
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

          // This means the mutated version will incorrectly filter ALL frames
          // that are within the line number range, regardless of filename

          // Check for specific patterns that should remain in the stack
          const hasExternalFrames = stack.split('\n').some((line: string) =>
            (line.includes('testCase.test.ts') || line.includes('at Object.')) &&
            !line.includes('q.js')
          );

          // In the original code, external frames should remain
          // In the mutated code, they might be incorrectly filtered
          expect(hasExternalFrames).toBe(true);

          // Also check that we have some q.js frames remaining (not all filtered)
          const hasQFrames = stack.split('\n').some((line: string) =>
            line.includes('q.js')
          );

          // This should be true in original code, might be false in mutated
          expect(hasQFrames).toBe(true);
        }
      }
    );
  });
});