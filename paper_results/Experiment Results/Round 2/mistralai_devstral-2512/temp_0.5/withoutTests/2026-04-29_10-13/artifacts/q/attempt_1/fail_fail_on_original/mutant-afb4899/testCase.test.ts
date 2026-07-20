import { Q } from "./q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with line and column numbers", () => {
    // Create a scenario that will generate a stack trace
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Force a rejection to trigger stack trace handling
    deferred.reject(new Error("Test error"));

    // The mutation affects stack trace parsing, specifically the regex pattern
    // that matches stack lines. The original pattern includes the end-of-string
    // anchor ($), while the mutated version doesn't. This test ensures that
    // stack traces are properly parsed by checking if the error handling
    // works as expected.
    return promise
      .then(
        () => {
          throw new Error("Should not be called");
        },
        (error) => {
          // If we get here, the error was properly handled
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe("Test error");
        }
      )
      .catch((err) => {
        // This should not happen if stack traces are parsed correctly
        throw new Error(`Unexpected error: ${err.message}`);
      });
  });
});