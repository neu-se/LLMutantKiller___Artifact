// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking process.toString() === "[object process]"
    // The mutation changes this to always true, which would make it work
    // even in non-Node environments where process.nextTick doesn't exist

    // Save the original process.nextTick
    const originalNextTick = process.nextTick;

    // Create a mock process object that looks like Node but doesn't have nextTick
    // We'll use Object.defineProperty to make it non-configurable
    const mockProcess = Object.create(process);
    Object.defineProperty(mockProcess, 'toString', {
      value: () => "[object process]",
      configurable: false,
      writable: false,
      enumerable: false
    });
    delete mockProcess.nextTick;

    // Temporarily replace global process
    const originalProcess = global.process;
    global.process = mockProcess;

    try {
      // Force re-evaluation by creating a new Q instance
      // This is tricky since the module is already loaded
      // We'll test the behavior by checking if it tries to use nextTick
      const deferred = Q.defer();
      let resolved = false;
      let error = null;

      deferred.promise.then(
        () => { resolved = true; },
        (e) => { error = e; }
      );

      // Try to resolve - this should fail in mutated code
      // because it will try to use process.nextTick which doesn't exist
      return Q.delay(10).then(() => {
        // Restore original process
        global.process = originalProcess;

        // In original code: should resolve via setTimeout fallback
        // In mutated code: would fail trying to call non-existent nextTick
        if (error) {
          throw new Error("Mutation detected - tried to use non-existent nextTick");
        }
        if (!resolved) {
          throw new Error("Promise did not resolve - mutation detected");
        }
      });
    } catch (e) {
      // Restore original process
      global.process = originalProcess;
      throw e;
    }
  });
});