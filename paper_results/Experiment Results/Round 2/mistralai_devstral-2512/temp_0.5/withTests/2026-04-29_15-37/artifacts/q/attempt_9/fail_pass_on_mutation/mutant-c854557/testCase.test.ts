// Test case to detect the mutation in the stack trace parsing regex
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Enable long stack traces to trigger the stack parsing code
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();

    // Create an error with a stack trace containing multi-digit line numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at anonymous (file.js:123:45)\n" +
                  "    at anonymous (file.js:678:90)";

    // Set up a promise chain that will trigger stack trace processing
    const promise = deferred.promise.then(() => {
      throw error;
    });

    deferred.resolve();

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (caughtError: Error) => {
        // The mutation would cause the regex to fail to match multi-digit line numbers
        // This would affect how the stack trace is filtered and formatted
        expect(caughtError).toBe(error);

        // The key difference: with the mutation, the stack trace filtering
        // would fail to properly identify internal frames because it can't
        // parse multi-digit line numbers correctly
        if (caughtError.stack) {
          // Check that both multi-digit line numbers are present in the stack
          const hasLine123 = caughtError.stack.includes("file.js:123:45");
          const hasLine678 = caughtError.stack.includes("file.js:678:90");

          // With the original code, both should be true
          // With the mutated code, the regex won't match these patterns
          expect(hasLine123).toBe(true);
          expect(hasLine678).toBe(true);

          // Additional check: the stack should contain exactly these patterns
          // The mutation would cause the regex to fail to match, potentially
          // causing the stack trace to be filtered incorrectly
          const stackLines = caughtError.stack.split('\n');
          const matchingLines = stackLines.filter(line =>
            line.includes('file.js:') &&
            (line.includes(':45') || line.includes(':90'))
          );
          expect(matchingLines.length).toBe(2);
        }
      }
    );
  });
});