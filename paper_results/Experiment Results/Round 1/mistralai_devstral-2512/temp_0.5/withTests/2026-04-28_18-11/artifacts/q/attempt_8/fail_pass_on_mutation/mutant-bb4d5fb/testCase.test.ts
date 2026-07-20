// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should correctly identify internal stack frames", () => {
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

          // Check for specific test file frames that should NOT be filtered
          const hasTestFileFrames = stack.split('\n').some((line: string) =>
            line.includes('testCase.test.ts') && line.includes('at ')
          );

          // In the original code, test file frames should remain visible
          // In the mutated code, they might be incorrectly filtered out
          expect(hasTestFileFrames).toBe(true);
        }
      }
    );
  });
});