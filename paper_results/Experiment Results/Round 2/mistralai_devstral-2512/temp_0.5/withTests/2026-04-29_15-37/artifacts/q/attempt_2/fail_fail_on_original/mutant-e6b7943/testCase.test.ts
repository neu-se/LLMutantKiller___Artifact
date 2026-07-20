// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly identify non-StopIteration exceptions", () => {
    // Create a regular error that should NOT be considered StopIteration
    const regularError = new Error("This is a regular error");

    // Test that regular errors are not treated as StopIteration
    // In the original code, this should return false
    // In the mutated code, it will incorrectly return true
    const testPromise = Q.async(function* () {
      try {
        throw regularError;
      } catch (e) {
        // This should only catch StopIteration or QReturnValue in original code
        // But will catch everything in mutated code
        return "incorrectly_caught";
      }
      return "not_caught";
    })();

    return testPromise.then((result: string) => {
      // In original code, regular errors should not be caught by isStopIteration
      // so this should fail (we expect "not_caught" but get "incorrectly_caught" in mutated version)
      expect(result).toBe("not_caught");
    });
  });
});