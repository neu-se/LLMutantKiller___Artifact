import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should execute async operations when setImmediate is empty and MessageChannel is blocked", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Block MessageChannel to prevent fallback
    global.MessageChannel = undefined;

    let executionOrder: string[] = [];

    // Create async operations that should execute in order
    Q.nextTick(() => {
      executionOrder.push('first');
    });

    Q.nextTick(() => {
      executionOrder.push('second');
    });

    // Check after a delay if operations completed in order
    setTimeout(() => {
      // In original code with proper fallback, operations should complete
      // In mutated code with empty setImmediate and no fallback, operations will hang
      expect(executionOrder).toEqual(['first', 'second']);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});