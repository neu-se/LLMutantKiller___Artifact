const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should include the exact starting line in stack trace filtering", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    // Create a nested promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve();
      })
      .then(() => {
        throw new Error("Test error at specific line");
      })
      .catch((error: Error) => {
        errorStack = error.stack;
        return Q.resolve();
      });

    return promise.then(() => {
      expect(errorStack).toBeDefined();

      // Count occurrences of the separator which indicates stack frames were preserved
      const separatorCount = (errorStack!.match(/From previous event:/g) || []).length;

      // The original code includes the starting line (>=), so more frames should be preserved
      // The mutated code excludes the starting line (>), so fewer frames should be preserved
      // We expect at least 2 separators in the original (showing the full chain)
      expect(separatorCount).toBeGreaterThanOrEqual(2);
    });
  });
});