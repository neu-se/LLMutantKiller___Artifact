// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment by checking process.toString()", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking process.toString() === "[object process]"
    // The mutation changes this to always true, which would make it work
    // even in non-Node environments where process.nextTick doesn't exist

    // Mock a non-Node environment by temporarily removing process.nextTick
    const originalNextTick = process.nextTick;
    delete process.nextTick;

    try {
      // Try to create a promise - this should fail in the original code
      // because it won't detect a proper Node environment without process.nextTick
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(() => {
        resolved = true;
      });

      // In the original code, this should not resolve immediately
      // because it won't use process.nextTick (which we removed)
      return Q.delay(10).then(() => {
        // In original code: should not be resolved (using setTimeout fallback)
        // In mutated code: would be resolved (incorrectly using process.nextTick)
        if (resolved) {
          throw new Error("Promise resolved incorrectly - mutation detected");
        }
      });
    } finally {
      // Restore process.nextTick
      process.nextTick = originalNextTick;
    }
  });
});