const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", async () => {
    // Enable long stack traces to ensure stack filtering is active
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace with internal frames
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // The original code filters out internal frames (line should NOT contain q.js)
      // The mutated code includes internal frames (line WILL contain q.js)
      const containsQFrame = stack?.includes("at ") && stack?.includes("q.js");
      expect(containsQFrame).toBe(false);
    }
  });
});