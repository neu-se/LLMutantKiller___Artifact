const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should handle missing stack trace information without throwing", () => {
    // Create a scenario where captureLine might be called with no stack
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = false;

    // Create a rejected promise which will trigger stack trace handling
    const promise = Q.reject(new Error("Test error"));

    // The mutation would cause captureLine to not return early when fileNameAndLineNumber is falsy
    // This should expose the difference in behavior
    expect(() => {
      promise.inspect();
    }).not.toThrow();

    // Restore original state
    Q.hasStacks = originalHasStacks;
  });
});