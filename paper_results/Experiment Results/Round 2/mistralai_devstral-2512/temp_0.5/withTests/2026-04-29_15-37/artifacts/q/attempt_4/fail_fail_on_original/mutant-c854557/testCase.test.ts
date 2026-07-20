// Test case to detect the mutation in the stack trace parsing regex
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Enable long stack traces to trigger the stack parsing code
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create an error with a stack trace containing multi-digit line numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at anonymous (file.js:123:45)\n" +
                  "    at anonymous (file.js:678:90)";

    // Set up a chain that will trigger stack trace processing
    deferred1.promise.then(() => {
      return deferred2.promise;
    });

    deferred2.reject(error);

    return deferred1.promise.then(
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
        const stackLines = caughtError.stack.split('\n');
        const hasMultiDigitLines = stackLines.some(line =>
          line.includes('file.js:123:45') || line.includes('file.js:678:90')
        );

        expect(hasMultiDigitLines).toBe(true);
      }
    );
  });
});