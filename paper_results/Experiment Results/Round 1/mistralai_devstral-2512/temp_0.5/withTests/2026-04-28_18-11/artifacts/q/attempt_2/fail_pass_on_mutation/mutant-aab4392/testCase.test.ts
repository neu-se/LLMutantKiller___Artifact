// Test case to detect the mutation in the captureLine function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine mutation test", () => {
  it("should properly capture stack trace without errors", () => {
    // This test forces the captureLine function to execute
    // The mutation changes the loop condition from i < lines.length to i <= lines.length
    // which would cause an out-of-bounds access and potentially throw an error
    // We expect the original code to work without throwing
    expect(() => {
      // Force Q to initialize and capture line info
      const deferred = Q.defer();
      deferred.resolve(42);
      return deferred.promise;
    }).not.toThrow();
  });
});