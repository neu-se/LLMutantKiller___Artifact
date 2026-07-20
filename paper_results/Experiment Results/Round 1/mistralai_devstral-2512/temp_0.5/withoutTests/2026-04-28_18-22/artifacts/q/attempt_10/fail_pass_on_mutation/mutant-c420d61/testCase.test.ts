const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter Node.js internal frames from long stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to build up stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    return promise.catch((error: Error) => {
      // The stack should be filtered to remove Node.js internal frames
      const stackLines = error.stack?.split('\n') || [];
      const hasNodeFrames = stackLines.some(line =>
        line.includes("(node.js:")
      );

      // Original code should filter them out (false)
      // Mutated code won't filter them (true)
      expect(hasNodeFrames).toBe(false);
    });
  });
});