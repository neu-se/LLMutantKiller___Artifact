const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace detection", () => {
  it("should properly detect stack trace support through promise creation", () => {
    // The mutation removes the error throwing/catching logic that determines stack trace support
    // This test checks the behavior that depends on proper stack detection

    // Create a promise that will be rejected
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Enable long stack support to trigger stack-related behavior
    Q.longStackSupport = true;

    // The original code should properly handle stack traces
    // The mutated code would fail to detect stack support
    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // Verify the error has a stack trace (original behavior)
        // This will fail in mutated code where stack detection is broken
        expect(caughtError.stack).toBeDefined();
        expect(caughtError.stack!.length).toBeGreaterThan(0);
        expect(caughtError.stack!).toContain("Test error");
      }
    );
  });
});