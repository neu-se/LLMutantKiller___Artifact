const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter Node.js internal frames when long stack traces are enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Check if the stack trace contains Node.js internal frames
      const hasNodeFrames = error.stack?.includes("(node.js:") || false;

      // The original code should filter out Node.js frames (false)
      // The mutated code will always return false from isNodeFrame, so frames won't be filtered (true)
      expect(hasNodeFrames).toBe(false);
    });
  });
});