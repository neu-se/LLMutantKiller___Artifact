// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString behavior", () => {
  it("should properly filter stack traces by removing internal frames while keeping external ones", () => {
    // Enable long stack traces to ensure we get internal frames
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal Q frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve();
      })
      .then(() => {
        throw new Error("Test error");
      });

    return promise.catch((error: Error) => {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Split stack into lines and filter out empty lines
      const stackLines = stack?.split('\n').filter(line => line.trim().length > 0) || [];

      // In original code: should have external frames but not internal Q frames
      // In mutated code: the loop is empty so all frames are kept (including internal ones)
      const hasInternalFrames = stackLines.some(line =>
        line.includes("q.js") &&
        (line.includes("promiseDispatch") ||
         line.includes("nextTick") ||
         line.includes("makeStackTraceLong"))
      );

      // Original code should filter out internal frames
      // Mutated code should keep them (since the loop is empty)
      expect(hasInternalFrames).toBe(false);
    });
  });
});