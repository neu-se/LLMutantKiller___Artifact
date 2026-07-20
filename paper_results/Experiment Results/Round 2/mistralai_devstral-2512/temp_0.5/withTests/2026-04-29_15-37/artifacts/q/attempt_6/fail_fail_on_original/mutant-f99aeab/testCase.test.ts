// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should properly capture stack trace information", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether qFileName gets set when stack traces are available

    // We'll test by checking if the internal stack trace filtering works
    // which depends on captureLine working correctly

    // Enable long stack support which requires captureLine
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      throw new Error("Test error");
    });

    // Return the promise chain
    return promise.catch((error: any) => {
      // In original code, the stack should be properly formatted with file info
      // In mutated code, the stack won't have proper file info because qFileName wasn't set
      expect(error.stack).toBeDefined();

      // Check if the stack contains file information (which requires qFileName to be set)
      const hasFileInfo = error.stack && (error.stack.includes(".js:") || error.stack.includes(".ts:"));
      expect(hasFileInfo).toBe(true);

      // Also check that the stack contains the error message
      expect(error.stack).toContain("Test error");
    });
  });
});