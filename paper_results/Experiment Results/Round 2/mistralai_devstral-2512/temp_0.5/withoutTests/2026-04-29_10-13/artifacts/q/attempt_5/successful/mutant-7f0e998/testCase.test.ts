const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a nested promise rejection to generate internal stack frames
    const promise = Q.resolve().then(() => {
      return Q.reject(new Error("Test error"));
    });

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Check for specific internal frame patterns that should be filtered
      // The original code filters these out, the mutated code keeps them
      const hasInternalPattern = /at.*q\.js/.test(stack) ||
                                stack.includes("filterStackString") ||
                                stack.includes("makeStackTraceLong");
      expect(hasInternalPattern).toBe(false);
    }
  });
});