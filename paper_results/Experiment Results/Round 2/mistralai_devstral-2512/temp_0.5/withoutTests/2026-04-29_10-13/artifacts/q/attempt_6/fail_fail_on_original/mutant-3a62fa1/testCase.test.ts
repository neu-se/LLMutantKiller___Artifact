const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library environment detection", () => {
  it("should fail when process.nextTick is incorrectly assumed in non-Node environments", (done) => {
    // This test specifically targets the mutation that changes:
    // "typeof process === 'object'" to "true"
    // which would cause Q to assume Node.js environment even when it's not

    // We'll simulate a non-Node environment by temporarily making process undefined
    const originalProcess = global.process;
    (global as any).process = undefined;

    try {
      // Clear the module cache to force re-evaluation of environment
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q");

      // In original code: should work fine using fallback mechanisms
      // In mutated code: will try to use process.nextTick which doesn't exist
      const testPromise = freshQ.resolve("test");

      testPromise.then((value: string) => {
        // If we reach here in mutated version, it means the mutation didn't break it
        // which would be unexpected since process.nextTick should be undefined
        done(new Error("Expected failure in mutated version but test passed"));
      }).catch((error: Error) => {
        // In original code: should not reach here
        // In mutated code: should fail with "process is not defined" or similar
        done(error);
      });
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});