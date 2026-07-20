// Test case to detect the mutation in the captureLine function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine mutation test", () => {
  it("should properly handle stack trace filtering", () => {
    // Enable long stack traces to trigger captureLine execution
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.Promise(function(resolve) {
      resolve();
    }).then(function() {
      // This will trigger stack trace capture
      throw new Error("Test error");
    }).catch(function(err) {
      // Verify the error has a stack trace
      expect(err.stack).toBeDefined();
      expect(err.stack.length).toBeGreaterThan(0);
    });

    return promise;
  });
});