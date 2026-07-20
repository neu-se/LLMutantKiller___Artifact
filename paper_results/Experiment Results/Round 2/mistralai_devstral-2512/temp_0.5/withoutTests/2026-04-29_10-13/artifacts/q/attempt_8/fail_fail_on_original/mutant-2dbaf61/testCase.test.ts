const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace detection", () => {
  it("should properly detect stack trace support through promise stack property", () => {
    // The mutation removes the error throwing/catching logic that determines stack trace support
    // This test checks the promise's stack property which depends on proper stack detection

    // Enable long stack support to trigger stack-related behavior
    Q.longStackSupport = true;

    // Create a rejected promise
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // In original code, the promise should have a stack property
    // In mutated code, stack detection fails so this property won't be set
    expect(promise.stack).toBeDefined();
    expect(typeof promise.stack).toBe("string");

    // Also verify the promise can be properly rejected
    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError) => {
        expect(caughtError.message).toBe("Test error");
      }
    );
  });
});