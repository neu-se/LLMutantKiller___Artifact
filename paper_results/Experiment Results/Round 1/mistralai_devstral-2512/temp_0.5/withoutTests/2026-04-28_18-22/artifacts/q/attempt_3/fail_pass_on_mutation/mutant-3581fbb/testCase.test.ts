const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should filter out internal frames but not Node frames", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will trigger stack trace filtering
    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // The stack trace should not contain internal Q frames
      const lines = error.stack?.split("\n") || [];
      const hasInternalFrame = lines.some((line: string) =>
        line.includes("q.js") && !line.includes("node.js") && !line.includes("module.js")
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code, this will fail because Node frames are incorrectly included
      expect(hasInternalFrame).toBe(false);
      return null;
    });
  });
});