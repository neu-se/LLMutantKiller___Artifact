const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace initialization", () => {
  it("should initialize hasStacks to false by default", () => {
    // Create a promise chain that would trigger stack trace capture
    const error = new Error("Test error");
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // Check if the stack trace contains Q's internal stack marker
        // In original code (hasStacks = false), qStartingLine won't be set
        // In mutated code (hasStacks = true), qStartingLine would be set
        // We verify this by checking if stack filtering occurred
        const hasInternalStack = caughtError.stack && caughtError.stack.includes("q.js");
        expect(hasInternalStack).toBe(false);
      }
    );
  });
});