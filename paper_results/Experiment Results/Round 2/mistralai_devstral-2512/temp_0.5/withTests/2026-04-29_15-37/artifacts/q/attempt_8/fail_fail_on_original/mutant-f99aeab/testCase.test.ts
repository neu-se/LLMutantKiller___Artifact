// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly filter internal stack frames", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether qFileName gets set, which is used to filter internal stack frames

    // Enable long stack support which depends on captureLine
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      throw new Error("Test error");
    });

    return promise.catch((error: any) => {
      // In original code, internal Q frames should be filtered out
      // In mutated code, filtering won't work properly because qFileName wasn't set

      const stack = error.stack;
      expect(stack).toBeDefined();

      // Check if the stack contains internal Q function names
      // In original code, these should be filtered out
      // In mutated code, they might appear because filtering is broken
      const hasInternalFrames = stack.includes("promiseDispatch") ||
                               stack.includes("makeStackTraceLong") ||
                               stack.includes("captureLine");

      // Original code should filter these out, mutated code might not
      expect(hasInternalFrames).toBe(false);

      // Also verify the error message is present
      expect(stack).toContain("Test error");
    });
  });
});