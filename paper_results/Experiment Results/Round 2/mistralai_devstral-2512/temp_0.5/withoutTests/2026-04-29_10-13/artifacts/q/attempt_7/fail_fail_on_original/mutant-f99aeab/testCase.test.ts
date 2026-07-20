// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly handle stack trace filtering based on hasStacks", () => {
    // Enable long stack traces to trigger the captureLine functionality
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error with stack");
      })
      .catch((error: Error) => {
        // The error should have a stack trace
        expect(error.stack).toBeDefined();
        expect(error.stack!.length).toBeGreaterThan(0);

        // The stack should be filtered to remove internal Q frames
        // This filtering depends on captureLine working correctly
        const hasInternalFrames = error.stack!.includes("q.js") ||
                                 error.stack!.includes("From previous event");
        expect(hasInternalFrames).toBe(false);
        return error;
      });

    // Return the promise chain
    return promise;
  });
});