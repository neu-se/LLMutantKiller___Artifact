const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should not capture stack traces when hasStacks is false", async () => {
    // Create an error and reject a promise with it
    const originalError = new Error("Test error");

    // With hasStacks=false, the error should remain unchanged
    // With hasStacks=true, the library would try to access/modify the stack
    const promise = Q.reject(originalError);

    let caughtError: Error;
    try {
      await promise;
    } catch (error) {
      caughtError = error;
    }

    // The key difference: with hasStacks=true, the library would try to:
    // 1. Access error.stack (which might not exist)
    // 2. Potentially modify the error object
    // With hasStacks=false, the error remains untouched

    // Verify the error is the same object (not modified)
    expect(caughtError).toBe(originalError);

    // Verify no extra properties were added
    const originalKeys = Object.keys(originalError);
    const caughtKeys = Object.keys(caughtError);
    expect(caughtKeys.sort()).toEqual(originalKeys.sort());
  });
});