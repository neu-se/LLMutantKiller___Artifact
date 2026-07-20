const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter Node.js frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // The original code should filter out Node.js frames
      // The mutated code (always returning false) should not filter them
      const lines = stack.split('\n');
      const hasNodeFrame = lines.some(line => line.includes("(node.js:"));

      // Original code should filter Node.js frames (hasNodeFrame = false)
      // Mutated code should not filter them (hasNodeFrame = true)
      expect(hasNodeFrame).toBe(false);
    }
  });
});