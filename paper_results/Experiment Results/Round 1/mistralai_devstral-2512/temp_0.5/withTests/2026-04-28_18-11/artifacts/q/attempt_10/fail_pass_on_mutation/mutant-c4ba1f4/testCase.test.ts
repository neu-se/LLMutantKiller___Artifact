import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should execute async operations when setImmediate is empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Block MessageChannel to prevent fallback
    global.MessageChannel = undefined;

    let executionCount = 0;

    // Create multiple async operations
    for (let i = 0; i < 3; i++) {
      Q.nextTick(() => {
        executionCount++;
      });
    }

    // Check after a delay if operations completed
    setTimeout(() => {
      // In original code with proper fallback, all operations should complete
      // In mutated code with empty setImmediate and no fallback, operations will hang
      expect(executionCount).toBe(3);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});