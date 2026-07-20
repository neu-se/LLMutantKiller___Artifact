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
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("Test error");

      // Check if stack contains the expected separator for long stacks
      // The mutation breaks this by making the condition always false
      if (e.stack) {
        expect(e.stack).toContain("From previous event:");
      }
    }
  });
});