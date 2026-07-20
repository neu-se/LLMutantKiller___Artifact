const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejected promise that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will trigger stack trace filtering
    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      const lines = error.stack?.split("\n") || [];
      const hasInternalFrame = lines.some((line: string) =>
        line.includes("q.js") &&
        !line.includes("node.js") &&
        !line.includes("module.js") &&
        !line.includes("testCase.test.ts")
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code, internal frames will be incorrectly included
      expect(hasInternalFrame).toBe(false);
      return null;
    });
  });
});