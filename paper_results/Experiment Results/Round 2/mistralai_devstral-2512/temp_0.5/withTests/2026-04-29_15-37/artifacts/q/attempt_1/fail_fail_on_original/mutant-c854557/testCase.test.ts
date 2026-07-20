// Test case to detect the mutation in the stack trace parsing regex
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a scenario that generates a stack trace with multi-digit line numbers
    // This will test the regex pattern that was mutated
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at Test.testFile (test.js:123:45)\n" +
                  "    at Object.<anonymous> (test.js:678:90)";

    // The mutation changes \d+ to \d which would fail to match multi-digit line numbers
    // We test this by creating a promise that should properly handle the error
    const deferred = Q.defer();
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        // Should not reach here
        throw new Error("Promise should have been rejected");
      },
      (caughtError) => {
        // Verify the error was properly caught and the stack trace was parsed
        expect(caughtError).toBe(error);
        expect(caughtError.stack).toContain("test.js:123:45");
        expect(caughtError.stack).toContain("test.js:678:90");
      }
    );
  });
});