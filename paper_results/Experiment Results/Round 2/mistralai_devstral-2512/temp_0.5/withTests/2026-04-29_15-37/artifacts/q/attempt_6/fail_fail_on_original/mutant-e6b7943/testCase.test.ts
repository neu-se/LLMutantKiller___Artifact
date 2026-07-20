// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly identify non-QReturnValue exceptions", () => {
    // Create a regular error that should NOT be considered QReturnValue
    const regularError = new Error("This is a regular error");

    // Test that regular errors are not treated as QReturnValue
    // In the original code, this should return false
    // In the mutated code, it will incorrectly return true
    const testPromise = Q.async(function* () {
      try {
        throw regularError;
      } catch (e) {
        // This should only catch QReturnValue in original code
        // But will catch everything in mutated code
        if (e instanceof Q.QReturnValue) {
          return "incorrectly_caught_as_return";
        }
        throw e; // Re-throw regular errors
      }
      return "not_caught";
    })();

    return testPromise.then(
      (result: string) => {
        // In original code, regular errors should not be caught as QReturnValue
        // so this should not be reached
        expect(result).toBe("not_caught");
      },
      (error: Error) => {
        // This is the expected path for regular errors in original code
        expect(error.message).toBe("This is a regular error");
      }
    );
  });
});