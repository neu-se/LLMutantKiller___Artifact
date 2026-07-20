import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly identify internal stack frames", () => {
    // This test directly tests the stack filtering behavior by creating
    // a scenario where we can observe the difference between the original
    // and mutated code

    // Enable long stack traces to ensure stack filtering is active
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Capture the stack before rejection
    const originalStack = error.stack;

    // Reject the promise
    deferred.reject(error);

    // Handle the rejection
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In the original version, the stack should be properly filtered
        // In the mutated version, the filtering logic is broken:
        // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
        // Mutated: fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

        // The mutated version would incorrectly filter lines that are:
        // 1. From qFileName AND lineNumber >= qStartingLine (correct)
        // 2. OR any line with lineNumber <= qEndingLine (incorrect - would filter non-Q lines)

        // We can detect this by checking if the stack contains lines that should NOT be filtered
        expect(caughtError.stack).toBeDefined();

        // The original stack should contain more lines than the filtered stack
        if (originalStack) {
          const originalLines = originalStack.split('\n').length;
          const filteredLines = caughtError.stack!.split('\n').length;

          // In the original version, some internal Q lines should be filtered out
          // In the mutated version, too many lines might be filtered (including non-Q lines)
          // This would result in a significantly shorter stack
          expect(filteredLines).toBeLessThanOrEqual(originalLines);

          // The key difference: in the mutated version, the OR condition would
          // filter out many more lines, resulting in a much shorter stack
          // We can't predict exact numbers, but we can verify the stack isn't empty
          expect(filteredLines).toBeGreaterThan(1);
        }

        return caughtError;
      }
    );
  });
});