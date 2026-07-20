const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library stack trace capture", () => {
  it("should handle stack trace parsing edge cases correctly", () => {
    // This test specifically targets the mutation in captureLine
    // where the return statement is removed when fileNameAndLineNumber is falsy

    // Create a scenario where getFileNameAndLineNumber returns falsy
    // by using a stack trace format that doesn't match any patterns
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = true;

    try {
      // Create an error with a stack trace that won't match any patterns
      const error = new Error("Test");
      error.stack = "Error: Test\n    at [unknown source]";

      // Create a rejected promise with this error
      const promise = Q.reject(error);

      return promise.then(
        () => {
          throw new Error("Should not resolve");
        },
        (caughtError: Error) => {
          // In the original code, when fileNameAndLineNumber is falsy,
          // captureLine returns undefined, which is handled gracefully
          // In the mutated code, it returns nothing, which could cause issues

          // The observable difference would be in how the stack is processed
          // With the mutation, qFileName might not be properly initialized
          // affecting stack trace filtering

          // Check if the error is still properly handled
          expect(caughtError.message).toBe("Test");
          expect(caughtError.stack).toBeDefined();

          // The key test: in the original code, the stack should be filtered
          // In the mutated code, it might not be filtered properly
          // We check if the stack contains the original unfiltered content
          expect(caughtError.stack).toContain("[unknown source]");
        }
      );
    } finally {
      Q.hasStacks = originalHasStacks;
    }
  });
});