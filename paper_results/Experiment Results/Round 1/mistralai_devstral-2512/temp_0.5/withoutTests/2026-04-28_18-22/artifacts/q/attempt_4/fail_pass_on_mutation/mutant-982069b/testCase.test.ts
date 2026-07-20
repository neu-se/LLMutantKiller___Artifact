// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should properly filter stack traces by removing internal frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deep promise chain to generate stack frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve();
      })
      .then(() => {
        throw new Error("Test error");
      });

    return promise.catch((error: Error) => {
      // The stack should be filtered to remove Q internal frames
      const stackLines = error.stack?.split('\n') || [];
      const hasQInternalFrames = stackLines.some(line =>
        line.includes("q.js") &&
        (line.includes("promiseDispatch") ||
         line.includes("nextTick") ||
         line.includes("makeStackTraceLong"))
      );

      // In original code, internal frames should be filtered out
      // In mutated code, they won't be filtered (empty loop)
      expect(hasQInternalFrames).toBe(false);
    });
  });
});