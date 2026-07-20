const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace behavior", () => {
  it("should not add stack jump separators when hasStacks is false", () => {
    // Create a promise chain that would trigger stack trace modification
    const error = new Error("Test error");
    const promise = Q.reject(error).then(() => {
      throw new Error("Chained error");
    });

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In original code (hasStacks = false), no stack jump separators should be added
        // In mutated code (hasStacks = true), stack jump separators would be added
        expect(caughtError.stack).not.toContain("From previous event:");
      }
    );
  });
});