const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: any) => {
      const stack = error.stack;
      // The mutation changes the isInternalFrame function to always return true
      // This means in the mutated version, ALL stack frames will be filtered out
      // In the original version, only Q internal frames are filtered
      // So we check if the stack is completely empty (mutated) or contains some frames (original)
      expect(stack).toBeDefined();
      expect(stack.length).toBeGreaterThan(0);
      // In the mutated version, the stack will be completely filtered (empty or very short)
      // In the original version, it will contain non-Q frames
      expect(stack.split('\n').length).toBeGreaterThan(2);
    });
  });
});