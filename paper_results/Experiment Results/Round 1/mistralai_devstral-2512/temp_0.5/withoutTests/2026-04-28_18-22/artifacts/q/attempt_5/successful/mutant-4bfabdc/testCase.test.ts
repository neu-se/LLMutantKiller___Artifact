const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace with internal frames
    const promise = Q.reject(new Error("Test error"));

    // Add handlers that will create internal frames in the stack
    const result = promise
      .catch((error: Error) => {
        return Q.delay(10).then(() => {
          throw error;
        });
      })
      .catch((error: Error) => {
        // At this point, the stack trace should have been filtered
        expect(error.stack).toBeDefined();

        // Count how many Q internal frames remain in the stack
        const stackLines = error.stack!.split('\n');
        const qInternalFrames = stackLines.filter((line: string) =>
          line.includes("q.js") && !line.includes("Test.")
        ).length;

        // Original code: should filter out most internal frames (< 3)
        // Mutated code: will keep more internal frames (>= 3)
        expect(qInternalFrames).toBeLessThan(3);

        return Q.resolve();
      });

    return result;
  });
});