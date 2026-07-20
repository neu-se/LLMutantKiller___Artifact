// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should filter Node.js internal frames from stack traces", () => {
    // Enable long stack traces to ensure stack filtering is active
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack frames
    const promise = Q.reject(new Error("Test error"))
      .then(() => { throw new Error("Should not reach here"); })
      .catch((error: Error) => {
        // Check if the stack trace contains Node.js internal frames
        const stack = error.stack || "";
        const hasNodeFrames = stack.includes("(node.js:") || stack.includes("(module.js:");

        // Original code should filter these frames (return false)
        // Mutated code (returning false from isNodeFrame) would not filter them
        // So we expect the original to have filtered them (false), but the mutant would show them (true)
        return hasNodeFrames;
      });

    return promise.then((hasNodeFrames: boolean) => {
      expect(hasNodeFrames).toBe(false);
    });
  });
});