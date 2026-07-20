import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should execute async operations when setImmediate is available", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to be available but empty (simulating the mutation)
    global.setImmediate = function() {};
    // Block MessageChannel to force reliance on setImmediate
    global.MessageChannel = undefined;

    let executionCount = 0;

    // Create multiple async operations that should execute
    for (let i = 0; i < 5; i++) {
      Q.nextTick(() => {
        executionCount++;
      });
    }

    // Check after a delay if operations completed
    setTimeout(() => {
      // In original code with proper setImmediate handling, all operations should complete
      // In mutated code with empty setImmediate and no fallback, operations will hang
      expect(executionCount).toBe(5);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});