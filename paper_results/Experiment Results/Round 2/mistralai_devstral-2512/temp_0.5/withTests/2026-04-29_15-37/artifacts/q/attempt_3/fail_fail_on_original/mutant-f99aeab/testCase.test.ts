// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly capture line numbers when stack traces are available", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether qFileName gets set properly when stack traces are available

    // We need to test the internal behavior by checking if long stack traces work
    // Enable long stack support which depends on captureLine working correctly
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      throw new Error("Test error");
    });

    // The key difference between original and mutated code:
    // Original: when hasStacks is true, captureLine works and sets qFileName
    // Mutated: when hasStacks is true, captureLine returns early without setting qFileName
    return promise.catch((error: any) => {
      // In original code, the stack should be properly formatted with file info
      // In mutated code, the stack won't have proper file info because qFileName wasn't set
      expect(error.stack).toBeDefined();

      // Check if the stack contains file information (which requires qFileName to be set)
      const hasFileInfo = error.stack && error.stack.includes(".js:");
      expect(hasFileInfo).toBe(true);
    });
  });
});