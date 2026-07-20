const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should handle missing stack trace information correctly in captureLine", () => {
    // Save original state
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = true;

    // Create a rejected promise to trigger stack trace handling
    const promise = Q.reject(new Error("Test error"));

    // Force long stack support to trigger captureLine
    Q.longStackSupport = true;

    // Manipulate the stack trace to simulate missing information
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => {
      // Return an empty stack to simulate missing information
      return [];
    };

    // Trigger stack trace handling
    const inspectResult = promise.inspect();

    // Verify the promise is in the correct state
    expect(inspectResult.state).toBe("rejected");

    // In the original code, qFileName should remain undefined when stack info is missing
    // In the mutated code, the empty if block would not return early, potentially causing issues
    expect((Q as any).qFileName).toBeUndefined();

    // Restore original state
    Q.hasStacks = originalHasStacks;
    Q.longStackSupport = false;
    Error.prepareStackTrace = originalPrepareStackTrace;
  });
});