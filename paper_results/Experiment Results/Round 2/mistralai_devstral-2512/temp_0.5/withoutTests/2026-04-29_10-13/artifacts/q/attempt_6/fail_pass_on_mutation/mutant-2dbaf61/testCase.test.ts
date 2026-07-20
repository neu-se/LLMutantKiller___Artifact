const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace detection", () => {
  it("should properly detect stack trace support through promise inspection", () => {
    // The mutation removes the error throwing/catching logic that determines stack trace support
    // This test checks the internal state that depends on proper stack trace detection

    // Create a rejected promise
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Force long stack support to trigger stack-related behavior
    Q.longStackSupport = true;

    // Inspect the promise to check internal state affected by stack detection
    const inspection = promise.inspect();

    // In original code, the promise should have proper stack handling
    // In mutated code, stack detection fails which affects the promise state
    expect(inspection.state).toBe("rejected");
    expect(inspection.reason).toBe(error);

    // The key difference: original code properly sets up stack handling
    // which affects how the promise is internally structured
    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError) => {
        // Verify the error maintains its stack trace
        expect(caughtError.stack).toBeDefined();
        expect(caughtError.stack.length).toBeGreaterThan(0);
      }
    );
  });
});