const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should include the starting line in stack trace filtering", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    // Create a deep promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => Q.resolve())
      .then(() => Q.resolve())
      .then(() => Q.resolve())
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        errorStack = error.stack;
        return Q.resolve();
      });

    return promise.then(() => {
      expect(errorStack).toBeDefined();

      // Count the number of "From previous event:" separators
      const separatorMatches = errorStack!.match(/From previous event:/g);
      const separatorCount = separatorMatches ? separatorMatches.length : 0;

      // The original code (>=) should preserve more stack frames
      // The mutated code (>) should preserve fewer stack frames
      // We expect at least 3 separators in the original version
      expect(separatorCount).toBeGreaterThanOrEqual(3);
    });
  });
});