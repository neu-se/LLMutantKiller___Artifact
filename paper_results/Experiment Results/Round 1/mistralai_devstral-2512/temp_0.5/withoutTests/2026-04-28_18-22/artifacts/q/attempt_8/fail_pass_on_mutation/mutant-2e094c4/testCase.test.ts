// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly identify and filter Node.js stack frames", () => {
    // Create a test case that will generate a stack trace with Node.js frames
    const deferred = Q.defer();
    setTimeout(() => {
      deferred.reject(new Error("Test error with Node.js frames"));
    }, 0);

    return deferred.promise.catch((error: Error) => {
      // The stack should be filtered by the original code
      const stack = error.stack || "";
      const hasNodeFrames = stack.includes("(node.js:") || stack.includes("(module.js:");

      // Original code filters Node.js frames (returns true from isNodeFrame)
      // Mutated code doesn't filter them (returns false from isNodeFrame)
      // So original should have filtered them (false), mutant would show them (true)
      expect(hasNodeFrames).toBe(false);
    });
  });
});