const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    return promise
      .catch((error: Error) => {
        // The stack trace should contain internal Q frames but not Node.js internal frames
        const hasQFrames = error.stack?.includes("q.js");
        const hasNodeFrames = error.stack?.includes("(node.js:") || error.stack?.includes("(module.js:");

        // Original code should filter out Node frames but keep Q frames
        // Mutated code should incorrectly keep Node frames
        expect(hasQFrames).toBe(true);
        expect(hasNodeFrames).toBe(false);
      });
  });
});