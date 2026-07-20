const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should not filter all stack frames when mutation is present", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deeply nested promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => {
        return Q.delay(1).then(() => {
          throw new Error("Deep error");
        });
      });

    try {
      await promise;
      fail("Expected promise to reject");
    } catch (error: any) {
      const stack = error.stack;
      expect(stack).toBeTruthy();

      // Count non-internal frames (those that should remain after filtering)
      const frames = stack.split('\n');
      const nonInternalFrames = frames.filter(frame =>
        !frame.includes('q.js') ||
        (frame.includes('q.js') && frame.includes('From previous event'))
      );

      // The mutation would filter ALL frames, leaving only the error message
      // Original code should leave some application frames
      expect(nonInternalFrames.length).toBeGreaterThan(1);
    }
  });
});