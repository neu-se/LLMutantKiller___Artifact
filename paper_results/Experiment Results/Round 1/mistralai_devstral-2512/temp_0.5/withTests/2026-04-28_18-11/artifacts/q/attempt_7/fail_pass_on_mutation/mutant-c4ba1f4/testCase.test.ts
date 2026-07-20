import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should properly execute async operations when setImmediate is empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Block MessageChannel to prevent fallback
    global.MessageChannel = undefined;

    let testCompleted = false;
    let errorOccurred = false;

    // Create a promise that should fail without proper async handling
    const deferred = Q.defer();
    deferred.promise.then(() => {
      testCompleted = true;
    }).catch(() => {
      errorOccurred = true;
    });

    // Try to resolve - this should fail in mutated code
    Q.nextTick(() => {
      deferred.resolve();
    });

    // Check after a delay
    setTimeout(() => {
      // In original code with proper fallback, test should complete
      // In mutated code with empty setImmediate and no fallback, it should fail
      expect(testCompleted).toBe(true);
      expect(errorOccurred).toBe(false);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});