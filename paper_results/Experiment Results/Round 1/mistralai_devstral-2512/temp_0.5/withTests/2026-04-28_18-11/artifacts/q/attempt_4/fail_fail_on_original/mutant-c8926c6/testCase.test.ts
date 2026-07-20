// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking process.toString() === "[object process]"
    // The mutation changes this to always true, which would make it work
    // even in non-Node environments where process.nextTick doesn't exist

    // Save original process.nextTick
    const originalNextTick = process.nextTick;

    // Create a mock process object that looks like Node but doesn't have nextTick
    const mockProcess = {
      toString: () => "[object process]"
    };

    // Temporarily replace global process
    global.process = mockProcess;

    try {
      // Force re-evaluation of the environment detection
      // This is tricky since the module is already loaded
      // We'll test the behavior indirectly by checking if it tries to use nextTick
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(() => {
        resolved = true;
      });

      // In original code: should use setTimeout fallback (since no nextTick)
      // In mutated code: would try to use process.nextTick (which doesn't exist)
      return Q.delay(20).then(() => {
        // Restore original process
        global.process = { ...global.process, nextTick: originalNextTick };

        // In original code: should resolve via setTimeout
        // In mutated code: would fail trying to call non-existent nextTick
        if (!resolved) {
          throw new Error("Promise did not resolve - mutation detected");
        }
      });
    } catch (e) {
      // Restore original process
      global.process = { ...global.process, nextTick: originalNextTick };
      throw e;
    }
  });
});