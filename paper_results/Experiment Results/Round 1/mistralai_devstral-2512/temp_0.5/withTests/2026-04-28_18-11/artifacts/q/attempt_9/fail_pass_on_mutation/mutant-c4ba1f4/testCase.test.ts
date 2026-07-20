import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should properly handle async operations when setImmediate is empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Block MessageChannel to prevent fallback
    global.MessageChannel = undefined;

    let testCompleted = false;

    // Create a promise that depends on async execution
    Q.resolve().then(() => {
      return new Promise((resolve) => {
        Q.nextTick(() => {
          testCompleted = true;
          resolve(null);
        });
      });
    });

    // Check after a delay if the operation completed
    setTimeout(() => {
      // In original code with proper fallback, test should complete
      // In mutated code with empty setImmediate and no fallback, it should fail
      expect(testCompleted).toBe(true);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});