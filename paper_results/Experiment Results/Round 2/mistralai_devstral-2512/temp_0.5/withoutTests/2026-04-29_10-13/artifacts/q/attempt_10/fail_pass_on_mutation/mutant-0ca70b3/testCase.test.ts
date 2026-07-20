const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces when long stack support is enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // Split the stack trace into lines
      const lines = error.stack.split('\n');

      // The original code should process all lines and filter out internal frames
      // The mutated code (i >= lines.length) would not process any lines
      // So we check that at least some lines were processed (filtered out)
      const hasInternalFrames = lines.some(line =>
        line.includes("q.js") ||
        line.includes("(module.js:") ||
        line.includes("(node.js:")
      );

      // With the original code, internal frames should be filtered out
      // With the mutated code, they would remain because the loop doesn't execute
      expect(hasInternalFrames).toBe(false);
    });
  });
});