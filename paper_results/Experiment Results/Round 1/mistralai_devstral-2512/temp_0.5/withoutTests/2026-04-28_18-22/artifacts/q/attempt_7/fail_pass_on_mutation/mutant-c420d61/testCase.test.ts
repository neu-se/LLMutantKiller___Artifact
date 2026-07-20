const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify and filter Node.js internal frames", () => {
    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    // Enable long stack traces to trigger the filtering
    Q.longStackSupport = true;

    return promise.catch((error: Error) => {
      // Check if the stack contains Node.js internal frames
      const hasNodeFrames = error.stack?.includes("(node.js:") || false;

      // In the original code, Node.js frames should be filtered out
      // In the mutated code, they won't be filtered (always returns false)
      expect(hasNodeFrames).toBe(false);
    });
  });
});