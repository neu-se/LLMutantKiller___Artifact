const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should include the starting line in internal frame detection", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    // Create a promise chain that will generate stack frames at specific lines
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve();
      })
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        errorStack = error.stack;
        return Q.resolve();
      });

    return promise.then(() => {
      expect(errorStack).toBeDefined();

      // Check if the stack contains internal Q frames
      // The original code includes qStartingLine in internal frames (>=)
      // The mutated code excludes qStartingLine from internal frames (>)
      // This should affect which frames are filtered out
      const hasInternalFrames = errorStack!.includes("From previous event:");

      // The original should preserve more frames (including starting line)
      // The mutated should filter out more frames (excluding starting line)
      expect(hasInternalFrames).toBe(true);

      // Count the number of preserved stack frames
      const frameCount = (errorStack!.match(/at /g) || []).length;
      expect(frameCount).toBeGreaterThan(2);
    });
  });
});