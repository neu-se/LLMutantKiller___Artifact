const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify internal stack frames including boundary line", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    // Create a promise chain that will generate stack frames
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

      // Check if the stack contains the "From previous event:" separator
      // This indicates that stack frames were preserved across promise boundaries
      const hasSeparator = errorStack!.includes("From previous event:");

      // The original code (>=) should preserve stack frames including the starting line
      // The mutated code (>) should exclude the starting line from preserved frames
      // This means the original should show the separator, while the mutated might not
      expect(hasSeparator).toBe(true);

      // Additionally check that we have at least some stack frames preserved
      const frameCount = (errorStack!.match(/at /g) || []).length;
      expect(frameCount).toBeGreaterThan(1);
    });
  });
});