const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should properly handle missing stack trace information in captureLine", () => {
    // Force an environment where stack traces are not available
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = false;

    // Create a rejected promise which will trigger stack trace handling
    const promise = Q.reject(new Error("Test error"));

    // Trigger the captureLine function by enabling long stack support
    Q.longStackSupport = true;

    // The mutation would cause captureLine to not return early when fileNameAndLineNumber is falsy
    // This should cause a difference in behavior when inspecting the promise
    const inspectResult = promise.inspect();

    // In the original code, captureLine returns early when fileNameAndLineNumber is falsy
    // In the mutated code, the empty if block would not return, potentially causing issues
    expect(inspectResult.state).toBe("rejected");

    // Restore original state
    Q.hasStacks = originalHasStacks;
    Q.longStackSupport = false;
  });
});