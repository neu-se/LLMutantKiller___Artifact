const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace behavior", () => {
  it("should not modify error stacks when hasStacks is false", () => {
    const originalStack = "Error: Test error\n    at Test.<anonymous> (test.ts:5:15)";
    const error = new Error("Test error");
    error.stack = originalStack;

    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In original code (hasStacks = false), the stack should remain unchanged
        // In mutated code (hasStacks = true), the stack would be modified
        expect(caughtError.stack).toBe(originalStack);
      }
    );
  });
});