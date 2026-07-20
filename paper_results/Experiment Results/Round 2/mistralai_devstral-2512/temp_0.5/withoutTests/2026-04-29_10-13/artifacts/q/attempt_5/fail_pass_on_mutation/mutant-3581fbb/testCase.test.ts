const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter Node.js internal frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    return promise
      .catch((error: Error) => {
        // Check if stack trace contains Node.js internal frames
        const hasNodeFrames = error.stack?.includes("(node.js:") || error.stack?.includes("(module.js:");

        // Original code should filter out Node frames (hasNodeFrames should be false)
        // Mutated code should incorrectly keep Node frames (hasNodeFrames should be true)
        expect(hasNodeFrames).toBe(false);
      });
  });
});