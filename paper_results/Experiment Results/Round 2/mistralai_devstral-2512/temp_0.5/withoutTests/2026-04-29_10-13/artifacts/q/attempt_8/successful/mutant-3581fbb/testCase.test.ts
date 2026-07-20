const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter Node.js frames but not application frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a function that will appear in the stack trace
    function applicationFunction() {
      throw new Error("Test error");
    }

    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(applicationFunction);

    return promise
      .catch((error: Error) => {
        const stack = error.stack || "";
        const hasApplicationFrame = stack.includes("applicationFunction");
        const hasNodeFrames = stack.includes("(node.js:") || stack.includes("(module.js:");

        // Original code should:
        // 1. Keep application frames (hasApplicationFrame should be true)
        // 2. Filter out Node frames (hasNodeFrames should be false)
        // Mutated code will incorrectly keep Node frames
        expect(hasApplicationFrame).toBe(true);
        expect(hasNodeFrames).toBe(false);
      });
  });
});