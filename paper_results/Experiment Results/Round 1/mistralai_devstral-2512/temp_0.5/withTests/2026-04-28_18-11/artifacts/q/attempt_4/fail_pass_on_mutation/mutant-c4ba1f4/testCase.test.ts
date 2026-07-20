import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should execute async operations when setImmediate is empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Ensure MessageChannel is available
    global.MessageChannel = originalMessageChannel;

    let testCompleted = false;
    let asyncValue = null;

    // Create a promise chain that depends on proper async scheduling
    Q.resolve()
      .then(() => {
        return new Promise(resolve => {
          // This should use the async mechanism
          Q.nextTick(() => {
            asyncValue = "resolved";
            resolve();
          });
        });
      })
      .then(() => {
        testCompleted = true;
      })
      .catch(() => {
        // Should not reach here
        testCompleted = false;
      });

    // Check after a delay if the async operation completed
    setTimeout(() => {
      expect(testCompleted).toBe(true);
      expect(asyncValue).toBe("resolved");

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});