const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should include Node frames in stack traces while filtering internal frames", () => {
    // Create a rejected promise with a Node-style error
    const promise = Q.reject(new Error("test error"));

    return promise.catch((error: Error) => {
      expect(error.stack).toBeDefined();

      const lines = error.stack?.split("\n") || [];
      const hasNodeFrame = lines.some((line: string) =>
        line.includes("node.js") || line.includes("module.js")
      );

      // The original code should include Node frames (hasNodeFrame = true)
      // The mutated code will incorrectly filter them out (hasNodeFrame = false)
      expect(hasNodeFrame).toBe(true);
      return null;
    });
  });
});