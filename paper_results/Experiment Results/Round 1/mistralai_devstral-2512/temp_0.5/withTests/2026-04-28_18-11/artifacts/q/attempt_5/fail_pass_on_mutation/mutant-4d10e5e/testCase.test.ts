const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should not modify error stacks when hasStacks is false", async () => {
    // Create a promise chain that will reject with an error
    const originalError = new Error("Test error");
    originalError.customProperty = "original";

    // Create a deferred that will reject
    const deferred = Q.defer();

    // Set up a handler that will modify the error if hasStacks is true
    deferred.promise.then(null, function(error) {
      // With hasStacks=true, the library will try to modify the error stack
      // With hasStacks=false, it won't touch the error
      throw error;
    });

    // Reject with our original error
    deferred.reject(originalError);

    try {
      await deferred.promise;
    } catch (error) {
      // With hasStacks=false, this should be the exact same error object
      // With hasStacks=true, the library may have modified it
      expect(error).toBe(originalError);
      expect(error.customProperty).toBe("original");

      // Check that no stack-related properties were added
      const keys = Object.keys(error);
      expect(keys).not.toContain("stackCounter");
      expect(keys).not.toContain("source");
    }
  });
});