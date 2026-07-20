import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should use MessageChannel when setImmediate is available but empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Ensure MessageChannel is available
    global.MessageChannel = originalMessageChannel;

    let asyncOperationCompleted = false;

    // Create a deferred that should use the async mechanism
    const deferred = Q.defer();
    deferred.promise.then(() => {
      asyncOperationCompleted = true;
    });

    // Resolve in next tick to trigger the async mechanism
    Q.nextTick(() => {
      deferred.resolve();
    });

    // Check after a delay if the async operation completed
    setTimeout(() => {
      expect(asyncOperationCompleted).toBe(true);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 50);
  });
});