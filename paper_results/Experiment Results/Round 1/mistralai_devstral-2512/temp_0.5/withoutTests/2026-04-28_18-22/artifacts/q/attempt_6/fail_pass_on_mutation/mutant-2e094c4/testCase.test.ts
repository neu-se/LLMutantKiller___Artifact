// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter Node.js stack frames", () => {
    // Create a scenario that will generate stack traces with Node.js frames
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Check if the stack trace contains Node.js internal frames
      const stack = error.stack || "";
      const hasNodeFrames = stack.includes("(node.js:") || stack.includes("(module.js:");

      // The original code should filter these frames (return false)
      // The mutated code (returning false from isNodeFrame) would not filter them
      // So we expect the original to have filtered them (false), but the mutant would show them (true)
      expect(hasNodeFrames).toBe(false);
    });
  });
});