import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter stack frames based on line number ranges", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Store original stack for comparison
    const originalStack = error.stack;

    // Reject the promise
    deferred.reject(error);

    // Handle the rejection
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // The mutation changes the condition from:
        // (fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine)
        // to:
        // (fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine)

        // This means in the mutated version, ANY line with lineNumber <= qEndingLine
        // would be considered internal, even if it's not from qFileName

        // We can detect this by checking if non-Q lines with line numbers <= qEndingLine
        // are incorrectly filtered out

        if (originalStack && caughtError.stack) {
          const originalLines = originalStack.split('\n');
          const filteredLines = caughtError.stack.split('\n');

          // Find lines that should NOT be filtered (non-Q lines with line numbers <= qEndingLine)
          // In the original version, these should remain in the stack
          // In the mutated version, these would be incorrectly filtered out

          // Count how many lines were actually filtered
          const filteredCount = originalLines.length - filteredLines.length;

          // In the original version, only Q library lines should be filtered
          // In the mutated version, many more lines would be filtered due to the OR condition
          // We expect the original version to filter fewer lines than the mutated version

          // Since we can't know the exact qEndingLine value, we'll check that
          // the filtering isn't too aggressive (which would happen in mutated version)
          expect(filteredCount).toBeLessThan(originalLines.length / 2);

          // Also verify we still have a meaningful stack trace
          expect(filteredLines.length).toBeGreaterThan(5);
        }

        return caughtError;
      }
    );
  });
});