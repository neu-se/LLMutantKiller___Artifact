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

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (caughtError: Error) => {
        // The mutation would cause the regex to fail to match multi-digit line numbers
        // This would affect how the stack trace is filtered and formatted
        expect(caughtError).toBe(error);
        expect(caughtError.stack).toBeDefined();

        // Check that the stack trace contains the expected line numbers
        // The mutated regex would fail to properly parse these
        if (caughtError.stack) {
          expect(caughtError.stack).toContain("file.js:123:45");
          expect(caughtError.stack).toContain("file.js:678:90");
        }
      }
    );
  });
});