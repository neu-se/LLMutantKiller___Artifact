const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should return undefined when stack trace information is missing", () => {
    // Save original state
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = true; // Enable stack traces to trigger captureLine

    // Create a scenario where getFileNameAndLineNumber returns falsy
    // by mocking the stack trace format
    const originalErrorStack = Error.stackTraceLimit;
    Error.stackTraceLimit = 0; // This will make stack traces empty

    // Create a rejected promise to trigger stack trace handling
    const promise = Q.reject(new Error("Test error"));

    // Force long stack support to trigger captureLine
    Q.longStackSupport = true;

    // The mutation changes the behavior when fileNameAndLineNumber is falsy
    // Original: returns undefined (early return)
    // Mutated: continues execution (empty if block)
    const inspectResult = promise.inspect();

    // Verify the promise is in the correct state
    expect(inspectResult.state).toBe("rejected");

    // In the original code, qFileName should remain undefined
    // In the mutated code, it might get set incorrectly
    expect((Q as any).qFileName).toBeUndefined();

    // Restore original state
    Q.hasStacks = originalHasStacks;
    Q.longStackSupport = false;
    Error.stackTraceLimit = originalErrorStack;
  });
});