// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should filter out internal frames from stack traces", () => {
    // Create a promise that will generate a stack trace with internal frames
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    return promise.catch((error: Error) => {
      const stack = error.stack;
      expect(stack).toBeDefined();

      // Count lines that contain internal Q frames
      const stackLines = stack?.split('\n') || [];
      const internalFrameCount = stackLines.filter(line =>
        line.includes("q.js") &&
        (line.includes("promiseDispatch") ||
         line.includes("nextTick") ||
         line.includes("makeStackTraceLong") ||
         line.includes("filterStackString"))
      ).length;

      // In original code: internal frames should be filtered out (count should be 0)
      // In mutated code: the loop is empty so internal frames remain (count > 0)
      expect(internalFrameCount).toBe(0);
    });
  });
});