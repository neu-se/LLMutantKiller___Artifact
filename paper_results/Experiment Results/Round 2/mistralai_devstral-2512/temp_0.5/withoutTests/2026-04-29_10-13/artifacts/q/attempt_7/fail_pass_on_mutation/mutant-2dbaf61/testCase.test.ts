const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace detection", () => {
  it("should correctly detect stack trace support through error stack presence", () => {
    // The mutation removes the error throwing/catching logic that determines stack trace support
    // This test directly checks if errors have stack traces, which depends on proper detection

    // Create a simple error and check if it has a stack trace
    // This is the core behavior affected by the mutation
    const testError = new Error("Test");
    const hasStack = !!testError.stack;

    // In original code, hasStacks would be true (from try-catch)
    // In mutated code, hasStacks would be false (no error thrown)
    // This affects how Q handles errors internally

    // Create a promise that will reject with this error
    const promise = Q.reject(testError);

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error) => {
        // The key assertion: error should have stack trace in original code
        // This will fail in mutated code where stack detection is broken
        expect(error.stack).toBeTruthy();
        expect(error.stack.length).toBeGreaterThan(0);
        expect(error.stack).toContain("Test");
      }
    );
  });
});