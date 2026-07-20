const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly filter internal frames from Firefox-style stack traces", () => {
    // Create a promise chain that will generate stack traces
    const promise = Q.resolve().then(() => {
      throw new Error("test error");
    });

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error) => {
        // The mutation would cause incorrect parsing of attempt3 patterns
        // which would affect stack trace filtering
        // This test verifies that internal Q frames are properly filtered
        const hasInternalFrames = error.stack && error.stack.includes("q.js");
        expect(hasInternalFrames).toBe(false);
      }
    );
  });
});