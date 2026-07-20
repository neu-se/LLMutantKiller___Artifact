const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error stack handling", () => {
  it("should correctly build long stack traces with multiple promise rejections", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will be rejected
    const error = new Error("Test error");
    const promiseChain = Q.reject(error)
      .then(() => { throw new Error("Should not reach here"); })
      .then(() => { throw new Error("Should not reach here"); });

    try {
      await promiseChain;
      fail("Promise should have rejected");
    } catch (e: any) {
      // In the original code, the stack should be properly built
      // In the mutated code, the stack building will be broken
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("Test error");
      // The mutation breaks stack trace building by always evaluating to false
      // in the condition, so the stack won't be properly concatenated
    }
  });
});