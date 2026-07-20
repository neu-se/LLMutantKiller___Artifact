const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter out Node.js internal frames but keep application frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace with Node.js frames
    const promise = Q.resolve()
      .then(() => {
        // Simulate a Node.js internal call by creating a frame that looks like one
        return new Promise((resolve) => {
          process.nextTick(() => {
            throw new Error("Test error from Node.js context");
          });
        });
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