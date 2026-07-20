const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library stack trace capture", () => {
  it("should properly capture file name and line number when available", () => {
    // Force stack traces to be available
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = true;

    try {
      // Create a scenario that will trigger the captureLine function
      // The mutation affects the behavior when fileNameAndLineNumber is falsy
      // Original: returns undefined
      // Mutated: returns nothing (void)

      // We'll test this by checking if the stack trace filtering works correctly
      const promise = Q.reject(new Error("Test error"));

      return promise.then(
        () => {
          throw new Error("Should not resolve");
        },
        (error: Error) => {
          // The mutation would cause qFileName to remain undefined
          // which would affect stack trace filtering
          expect(error.stack).toBeDefined();
          expect(typeof error.stack).toBe('string');

          // If the mutation is present, qFileName would be undefined
          // causing isInternalFrame to always return false
          // This means internal frames wouldn't be filtered out
          // So we check if internal frames are properly filtered
          const hasInternalFrames = error.stack && error.stack.includes("q.js");
          expect(hasInternalFrames).toBe(false);
        }
      );
    } finally {
      Q.hasStacks = originalHasStacks;
    }
  });
});