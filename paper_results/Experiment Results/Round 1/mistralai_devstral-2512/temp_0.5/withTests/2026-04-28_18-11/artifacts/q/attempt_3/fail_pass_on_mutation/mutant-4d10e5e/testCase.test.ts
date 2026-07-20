const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should handle errors without stack property when hasStacks is false", async () => {
    // Create an error without a stack property (simulating an environment where stacks aren't available)
    const errorWithoutStack = new Error("Test error");
    delete errorWithoutStack.stack;

    // With hasStacks=false, this should work fine
    // With hasStacks=true, the library will try to access error.stack and may fail
    const promise = Q.reject(errorWithoutStack);

    let caughtError: Error;
    try {
      await promise;
    } catch (error) {
      caughtError = error;
    }

    // Verify we got the error back
    expect(caughtError).toBe(errorWithoutStack);
    expect(caughtError.message).toBe("Test error");

    // The key difference: with hasStacks=true, the library would try to:
    // 1. Check if error.stack exists (it doesn't)
    // 2. Potentially fail when trying to manipulate the stack
    // With hasStacks=false, it skips all stack-related operations
  });
});