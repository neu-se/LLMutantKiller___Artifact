const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library process detection mutation", () => {
  it("should fail when process detection is bypassed in non-Node environments", (done) => {
    // This test specifically targets the mutation that changes:
    // "typeof process === 'object'" to "true"
    // which would cause Q to assume Node.js environment even when it's not

    // We'll test by creating a scenario where process.nextTick doesn't exist
    // but the mutated code would try to use it anyway

    // Save original process.nextTick
    const originalNextTick = process.nextTick;

    // Temporarily make process.nextTick undefined to simulate non-Node environment
    process.nextTick = undefined;

    try {
      // Clear module cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q");

      // In original code: should use fallback (setImmediate, MessageChannel, or setTimeout)
      // In mutated code: will try to use process.nextTick which is undefined
      const testPromise = freshQ.resolve("test");

      testPromise.then((value: string) => {
        // If we reach here in mutated version, the mutation didn't break it
        // which means the test isn't catching the mutation properly
        done(new Error("Expected failure in mutated version"));
      }).catch((error: Error) => {
        // In original code: should not reach here
        // In mutated code: should fail with "process.nextTick is not a function"
        done();
      });
    } finally {
      // Restore original nextTick
      process.nextTick = originalNextTick;
    }
  });
});