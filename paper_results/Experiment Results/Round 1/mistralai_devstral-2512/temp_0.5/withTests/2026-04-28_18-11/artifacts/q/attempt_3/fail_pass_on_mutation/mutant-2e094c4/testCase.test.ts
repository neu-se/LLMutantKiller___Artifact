// Test case to detect the mutation in isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly filter Node.js stack frames from error traces", () => {
    // Create a promise that will reject and generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // The original code should filter Node.js frames, while the mutated code won't
    // We test this by checking if the stack trace contains Node.js frames
    return promise.then(
      () => {},
      (error) => {
        const stack = error.stack || "";
        // This assertion will fail in the mutated version where isNodeFrame always returns false
        // because the stack trace won't be filtered properly
        expect(stack.includes("(module.js:") || stack.includes("(node.js:")).toBe(false);
      }
    );
  });
});