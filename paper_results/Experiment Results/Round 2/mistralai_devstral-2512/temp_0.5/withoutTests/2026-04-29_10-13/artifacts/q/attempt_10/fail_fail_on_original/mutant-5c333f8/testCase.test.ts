const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve exact boundary line in stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    // Create a promise chain that generates stack frames at specific lines
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve();
      })
      .then(() => {
        throw new Error("Test error at boundary");
      })
      .catch((error: Error) => {
        errorStack = error.stack;
        return Q.resolve();
      });

    return promise.then(() => {
      expect(errorStack).toBeDefined();

      // Count the number of preserved stack frames
      const frameCount = (errorStack!.match(/at /g) || []).length;

      // The original code (>=) should preserve more frames (including starting line)
      // The mutated code (>) should preserve fewer frames (excluding starting line)
      // We expect exactly 3 frames in the original version
      expect(frameCount).toBe(3);
    });
  });
});