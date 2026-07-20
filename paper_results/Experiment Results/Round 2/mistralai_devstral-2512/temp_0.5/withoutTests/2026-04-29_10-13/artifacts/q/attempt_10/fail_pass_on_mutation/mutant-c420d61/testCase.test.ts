const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter Node.js frames from stack traces", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (error: any) => {
        const stack = error.stack;
        expect(stack).toBeDefined();

        // Check if the stack contains Node.js frames
        const hasNodeFrame = stack.includes("(node.js:");

        // Original code should filter Node.js frames (hasNodeFrame = false)
        // Mutated code should not filter them (hasNodeFrame = true)
        // This test will pass on original and fail on mutated
        expect(hasNodeFrame).toBe(false);
      }
    );
  });
});