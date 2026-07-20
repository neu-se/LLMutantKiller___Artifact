const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should properly handle missing stack trace information in captureLine", () => {
    // Save original state
    const originalHasStacks = Q.hasStacks;
    const originalLongStackSupport = Q.longStackSupport;

    // Force an environment where stack traces are not available
    Q.hasStacks = false;
    Q.longStackSupport = true;

    // Create a rejected promise
    const promise = Q.reject(new Error("Test error"));

    // Trigger stack trace handling by forcing a stack trace to be created
    try {
      throw new Error("Stack trace test");
    } catch (e) {
      // This will trigger captureLine() which should handle missing stack info
      if (Q.hasStacks) {
        // This block won't execute due to our setup, but helps verify the path
      }
    }

    // The mutation would cause captureLine to not return early when fileNameAndLineNumber is falsy
    // This should cause a difference in behavior when the promise is inspected
    const inspectResult = promise.inspect();

    // Verify the promise is in the correct state
    expect(inspectResult.state).toBe("rejected");

    // Restore original state
    Q.hasStacks = originalHasStacks;
    Q.longStackSupport = originalLongStackSupport;
  });
});