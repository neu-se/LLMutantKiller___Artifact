const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise rejection tracking", () => {
  it("should handle errors without stack traces correctly", () => {
    // Create an error-like object without a stack trace
    const errorWithoutStack = { message: "Test error" };
    const promise = Q.reject(errorWithoutStack);

    // The mutation would cause this to fail because it would try to access
    // errorWithoutStack.stack when it's undefined (due to the mutated condition)
    return promise.then(null, (reason) => {
      expect(reason).toBe(errorWithoutStack);
      expect(reason.stack).toBeUndefined();
    });
  });
});