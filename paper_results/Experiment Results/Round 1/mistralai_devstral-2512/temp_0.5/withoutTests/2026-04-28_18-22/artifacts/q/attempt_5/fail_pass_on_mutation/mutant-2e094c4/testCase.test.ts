// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should filter Node.js internal frames from stack traces", () => {
    // Create a promise that will be rejected with a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a chain of promises to generate stack frames
    const promise = deferred.promise
      .then(() => { throw new Error("Should not reach here"); })
      .catch((error: Error) => {
        // Check if the stack contains Node.js internal frames
        const stack = error.stack || "";
        const hasNodeFrames = stack.includes("(node.js:") || stack.includes("(module.js:");

        // Original code should filter these frames (return false)
        // Mutated code would not filter them (return true)
        return hasNodeFrames;
      });

    return promise.then((hasNodeFrames: boolean) => {
      expect(hasNodeFrames).toBe(false);
    });
  });
});