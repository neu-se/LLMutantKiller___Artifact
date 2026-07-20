const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter Node.js stack frames", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (error: any) => {
        const stack = error.stack;
        expect(stack).toBeDefined();

        // Check for Node.js frames in the stack
        const hasNodeFrame = stack.split('\n').some(line =>
          line.includes("(node.js:")
        );

        // Original code should filter Node.js frames (hasNodeFrame = false)
        // Mutated code should not filter them (hasNodeFrame = true)
        expect(hasNodeFrame).toBe(false);
      }
    );
  });
});