import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should properly handle async operations when setImmediate is empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Block MessageChannel to force the test to rely on setImmediate
    global.MessageChannel = undefined;

    let testCompleted = false;

    // Create a deferred that should use the async mechanism
    const deferred = Q.defer();
    deferred.promise.then(() => {
      testCompleted = true;
    });

    // Resolve in next tick to trigger the async mechanism
    Q.nextTick(() => {
      deferred.resolve();
    });

    // Check after a delay if the async operation completed
    setTimeout(() => {
      // In original code with proper setImmediate handling, this should complete
      // In mutated code with empty setImmediate and no fallback, this will hang
      expect(testCompleted).toBe(true);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});