import { Q } from "./q.js";

describe("Q stack trace filtering", () => {
  it("should filter internal Node.js frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error) {
      // The stack trace should not contain internal Node.js frames
      const stack = error.stack;
      expect(stack).toBeDefined();
      expect(stack).not.toContain("(node.js:");
    }
  });
});