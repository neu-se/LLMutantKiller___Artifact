const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces by excluding internal frames and including Node frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejected promise that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will trigger stack trace filtering
    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      const lines = error.stack?.split("\n") || [];
      const hasNodeFrame = lines.some((line: string) =>
        line.includes("node.js") || line.includes("module.js")
      );
      const hasInternalFrame = lines.some((line: string) =>
        line.includes("q.js") &&
        !line.includes("node.js") &&
        !line.includes("module.js") &&
        !line.includes("testCase.test.ts")
      );

      // In the original code:
      // - Node frames should be included (hasNodeFrame should be true)
      // - Internal Q frames should be filtered out (hasInternalFrame should be false)
      // In the mutated code:
      // - Node frames will be incorrectly filtered out (hasNodeFrame will be false)
      // - Internal frames will be incorrectly included (hasInternalFrame will be true)
      expect(hasNodeFrame).toBe(true);
      expect(hasInternalFrame).toBe(false);
      return null;
    });
  });
});