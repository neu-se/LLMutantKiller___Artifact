const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve stack frames at the exact starting line boundary", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    // Create a promise chain that generates stack frames
    // The key is to create a scenario where the starting line is exactly
    // at the boundary of what should be filtered
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

      // Count the number of "From previous event:" separators
      // This indicates how many promise transitions were preserved in the stack
      const separatorMatches = errorStack!.match(/From previous event:/g);
      const separatorCount = separatorMatches ? separatorMatches.length : 0;

      // The original code (>=) should preserve more transitions
      // The mutated code (>) should preserve fewer transitions
      // We expect exactly 2 transitions in the original
      expect(separatorCount).toBe(2);
    });
  });
});