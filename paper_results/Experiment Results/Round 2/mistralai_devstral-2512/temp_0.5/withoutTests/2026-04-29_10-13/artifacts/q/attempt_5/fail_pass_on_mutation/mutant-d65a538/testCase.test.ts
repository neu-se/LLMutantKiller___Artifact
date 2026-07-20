const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should handle missing stack trace information in captureLine without side effects", () => {
    // Save original state
    const originalHasStacks = Q.hasStacks;
    const originalLongStackSupport = Q.longStackSupport;

    // Force an environment where stack traces are not available
    Q.hasStacks = false;
    Q.longStackSupport = true;

    // Create a rejected promise
    const promise = Q.reject(new Error("Test error"));

    // Trigger stack trace handling
    const inspectResult = promise.inspect();

    // The mutation would cause captureLine to not return early when fileNameAndLineNumber is falsy
    // This test verifies that the function still works correctly in this edge case
    expect(inspectResult.state).toBe("rejected");
    expect(inspectResult.reason).toBeInstanceOf(Error);
    expect(inspectResult.reason.message).toBe("Test error");

    // Restore original state
    Q.hasStacks = originalHasStacks;
    Q.longStackSupport = originalLongStackSupport;
  });
});