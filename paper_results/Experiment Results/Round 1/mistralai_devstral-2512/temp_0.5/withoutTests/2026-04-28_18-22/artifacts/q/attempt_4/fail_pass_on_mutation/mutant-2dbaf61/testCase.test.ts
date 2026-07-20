const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library stack trace handling", () => {
  it("should properly detect stack trace support", () => {
    // The mutation changes the stack trace detection logic
    // In the original code, hasStacks is set based on whether an error has a stack property
    // In the mutated code, the empty try-catch block means hasStacks remains true (its initial value)
    // This test checks the actual behavior of stack trace handling

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Capture the stack before resolving
    const stackBefore = error.stack;

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In the original code, long stack traces should be enabled
        // In the mutated code, the stack trace handling is broken
        expect(caughtError.stack).toBeDefined();
        expect(caughtError.stack).toContain("Test error");

        // The key difference: in the mutated version, the stack trace
        // won't be properly filtered/extended because hasStacks detection is broken
        if (Q.longStackSupport) {
          // If long stack support is enabled, we should see evidence of it
          // This won't work properly in the mutated version
          expect(caughtError.stack).toContain("From previous event");
        }
      }
    );
  });
});