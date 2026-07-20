// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment by checking process.toString()", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking process.toString() === "[object process]"
    // The mutation changes this to always true, which would make it work
    // even in non-Node environments where process.nextTick doesn't exist

    // Create a mock environment that looks like Node but doesn't have nextTick
    const mockProcess = {
      toString: () => "[object process]",
      // Explicitly set nextTick to undefined to simulate missing property
      nextTick: undefined as unknown as typeof process.nextTick
    };

    // Temporarily replace global process
    const originalProcess = global.process;
    global.process = mockProcess as any;

    try {
      // Create a new deferred and try to resolve it
      // This should fail in the mutated code because it will try to use
      // process.nextTick which is undefined in our mock environment
      const deferred = Q.defer();
      let resolved = false;
      let error: Error | null = null;

      deferred.promise.then(
        () => { resolved = true; },
        (e: Error) => { error = e; }
      );

      // Try to resolve - this should work in original code (uses setTimeout fallback)
      // but fail in mutated code (tries to use undefined nextTick)
      return Q.delay(20).then(() => {
        // Restore original process
        global.process = originalProcess;

        // In original code: should resolve via setTimeout fallback
        // In mutated code: would fail trying to call undefined nextTick
        if (error) {
          throw new Error("Mutation detected - tried to use undefined nextTick");
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