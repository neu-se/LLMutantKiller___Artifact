const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should not completely empty the stack trace when filtering", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeTruthy();

      // The mutation changes the filter condition to always return true
      // which would remove ALL frames. We check that the stack contains
      // more than just the error message line
      const stackLines = stack.split('\n');
      const nonErrorLines = stackLines.filter(line =>
        !line.includes("Error: Test error") &&
        !line.includes("at ") &&
        line.trim() !== ""
      );

      // Original code should have some filtered content remaining
      // Mutation would remove everything except possibly the error message
      expect(nonErrorLines.length).toBeGreaterThan(0);
    }
  });
});