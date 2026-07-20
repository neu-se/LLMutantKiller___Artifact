const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should not enable long stack traces by default", () => {
    // Enable long stack support to test the hasStacks behavior
    Q.longStackSupport = true;

    const error = new Error("Test error");
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In original code (hasStacks = false), even with longStackSupport enabled,
        // the stack won't contain the separator because hasStacks is false
        // In mutated code (hasStacks = true), the stack would contain the separator
        expect(caughtError.stack).not.toContain("From previous event:");
      }
    );
  });
});