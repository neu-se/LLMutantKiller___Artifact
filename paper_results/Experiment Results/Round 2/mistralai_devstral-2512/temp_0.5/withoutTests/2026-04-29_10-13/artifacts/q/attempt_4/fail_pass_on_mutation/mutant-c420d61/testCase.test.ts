const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify Node.js stack frames", async () => {
    // Create a promise that will generate a stack trace with Node.js frames
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Check if the stack contains Node.js frames
      const hasNodeFrame = stack.includes("(node.js:");
      expect(hasNodeFrame).toBe(false);
    }
  });
});