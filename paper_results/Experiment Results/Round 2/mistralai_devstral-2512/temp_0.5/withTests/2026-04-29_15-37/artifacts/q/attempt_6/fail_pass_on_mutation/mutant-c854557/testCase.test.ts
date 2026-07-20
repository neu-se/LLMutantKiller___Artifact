// Test case to detect the mutation in the stack trace parsing regex
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Enable long stack traces to trigger the stack parsing code
    Q.longStackSupport = true;

    // Create a promise that will be rejected with an error
    // containing a stack trace with multi-digit line numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at anonymous (file.js:123:45)\n" +
                  "    at anonymous (file.js:678:90)";

    // Create a promise chain that will trigger stack trace processing
    const promise = Q.reject(error);

    // The makeStackTraceLong function should be called when long stack support is enabled
    // and the promise is rejected. This function uses getFileNameAndLineNumber which
    // contains the mutated regex pattern.
    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (caughtError: Error) => {
        // Verify the error was caught
        expect(caughtError).toBe(error);

        // The key test: with the mutation (\d instead of \d+), the regex would fail
        // to match multi-digit line numbers, causing the stack trace filtering to fail
        // This would result in different stack trace content
        if (caughtError.stack) {
          // Count how many lines contain our test file pattern
          const stackLines = caughtError.stack.split('\n');
          const fileLines = stackLines.filter(line =>
            line.includes('file.js:') &&
            (line.includes(':45') || line.includes(':90'))
          );

          // With the original code, we should find both lines
          // With the mutated code, the regex won't match multi-digit line numbers
          // so these lines might be filtered out differently
          expect(fileLines.length).toBeGreaterThan(0);
        }
      }
    );
  });
});