const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should not enable long stack traces by default", () => {
    // Create a chain of promises to test stack trace behavior
    const error = new Error("Original error");
    const promise1 = Q.reject(error);
    const promise2 = promise1.then(() => {
      return Q.resolve("should not reach here");
    });

    return promise2.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In original code (hasStacks = false), long stack traces are disabled
        // In mutated code (hasStacks = true), long stack traces would be enabled
        // We check that the stack doesn't contain the long stack separator
        expect(caughtError.stack).not.toContain("From previous event:");
      }
    );
  });
});