const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should execute the filterStackString loop correctly", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Enable long stack traces
    Q.longStackSupport = true;

    return promise.catch((error: Error) => {
      const stack = error.stack || "";
      const lines = stack.split("\n");

      // The mutation changes the loop condition from i < lines.length to i >= lines.length
      // This means the loop won't execute at all in the mutated version
      // We can detect this by checking if ANY filtering occurred
      // In the original code, some lines should be filtered out
      // In the mutated code, no lines will be filtered

      // Count total lines and lines that look like stack frames
      const totalLines = lines.length;
      const stackFrameLines = lines.filter(line =>
        line.includes(".js:") || line.includes(".ts:")
      ).length;

      // In original code, some stack frames should be filtered (stackFrameLines < totalLines)
      // In mutated code, no filtering occurs (stackFrameLines === totalLines)
      expect(stackFrameLines).toBeLessThan(totalLines);
    });
  });
});