const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should include application code frames in long stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    function outerFunction() {
      return Q.delay(1).then(() => {
        throw new Error("Test error from application code");
      });
    }

    return outerFunction().catch((error: any) => {
      const stack = error.stack;
      // In original version, stack should contain application frames
      // In mutated version, all frames are filtered out
      expect(stack).toContain("outerFunction");
    });
  });
});