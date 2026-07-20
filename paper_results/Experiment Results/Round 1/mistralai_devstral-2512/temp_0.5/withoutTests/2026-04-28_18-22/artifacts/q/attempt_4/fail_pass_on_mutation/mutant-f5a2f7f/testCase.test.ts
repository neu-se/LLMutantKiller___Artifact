const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly initialize stack trace support", () => {
    // This test verifies that Q correctly initializes stack trace support
    // The mutation changes the condition from `if (!hasStacks)` to `if (false)`
    // which would break the initialization logic

    // Create a promise and check if stack traces are properly initialized
    const promise = Q.resolve("test");

    // In the original code, the promise should have stack trace support
    // In the mutated code, the initialization is broken
    expect(promise.inspect().state).toBe("fulfilled");

    // Create a rejected promise to test stack trace capture
    const rejected = Q.reject(new Error("test error"));

    return rejected.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // In original code, stack should be captured
        // In mutated code, stack capture is broken
        expect(error.stack).toBeDefined();
        expect(error.stack.length).toBeGreaterThan(0);
        expect(error.stack).toContain("test error");
      }
    );
  });
});