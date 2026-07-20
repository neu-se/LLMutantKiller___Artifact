import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should filter internal Node.js frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // The stack trace should not contain internal Node.js frames
      expect(error.stack).toBeDefined();
      expect(error.stack).not.toContain("(module.js:");
      expect(error.stack).not.toContain("(node.js:");
    }
  });
});