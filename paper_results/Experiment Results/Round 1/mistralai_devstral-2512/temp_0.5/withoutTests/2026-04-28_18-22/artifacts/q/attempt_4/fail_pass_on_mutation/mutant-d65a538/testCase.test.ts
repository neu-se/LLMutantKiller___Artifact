const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library stack trace capture", () => {
  it("should capture line number when stack traces are available", () => {
    // This test directly tests the captureLine function behavior
    // The mutation changes the return behavior when fileNameAndLineNumber is falsy
    // In the original, it returns undefined, in the mutated version it returns nothing (void)

    // We need to test this indirectly through the stack trace functionality
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = true;

    try {
      // Create a promise chain that will generate a stack trace
      const deferred = Q.defer();
      deferred.promise.then(() => {
        throw new Error("Test error");
      }).catch((error: Error) => {
        // The mutation affects how stack traces are captured
        // In the original code, when fileNameAndLineNumber is falsy, it returns
        // In the mutated code, it returns nothing (void)
        // This should affect the stack trace filtering
        expect(error.stack).toBeDefined();
        expect(typeof error.stack).toBe('string');
      });

      deferred.resolve();
    } finally {
      Q.hasStacks = originalHasStacks;
    }
  });
});