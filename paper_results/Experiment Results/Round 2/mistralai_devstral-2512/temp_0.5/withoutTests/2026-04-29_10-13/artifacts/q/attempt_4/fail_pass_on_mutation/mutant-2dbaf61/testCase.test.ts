const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace detection", () => {
  it("should properly detect stack trace support and handle errors", () => {
    // The mutation removes the error throwing/catching logic that determines stack trace support
    // This test creates a scenario where stack trace handling would be different

    // Enable long stack support to trigger stack trace handling
    Q.longStackSupport = true;

    // Create a rejected promise with an error that should have stack trace
    const error = new Error("Test error");
    const rejectedPromise = Q.reject(error);

    // In the original code, the error should have a stack trace
    // In the mutated code, stack trace detection fails, affecting error handling
    return rejectedPromise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError) => {
        // Verify the error has a stack trace (original behavior)
        expect(caughtError.stack).toBeDefined();
        expect(typeof caughtError.stack).toBe("string");
        expect(caughtError.stack.length).toBeGreaterThan(0);

        // Verify it's the same error we created
        expect(caughtError.message).toBe("Test error");
      }
    );
  });
});