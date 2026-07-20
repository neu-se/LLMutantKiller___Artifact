import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should properly fall back to MessageChannel when setImmediate is empty", (done) => {
    // Save original globals
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but be empty (simulating the mutation)
    global.setImmediate = function() {};
    // Ensure MessageChannel is available
    global.MessageChannel = originalMessageChannel;

    let executionOrder = [];

    // Create multiple async operations to test the queue
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    deferred1.promise.then(() => {
      executionOrder.push(1);
    });

    deferred2.promise.then(() => {
      executionOrder.push(2);
    });

    deferred3.promise.then(() => {
      executionOrder.push(3);
    });

    // Schedule resolutions in specific order
    Q.nextTick(() => {
      executionOrder.push('tick1');
      deferred1.resolve();
    });

    Q.nextTick(() => {
      executionOrder.push('tick2');
      deferred2.resolve();
    });

    Q.nextTick(() => {
      executionOrder.push('tick3');
      deferred3.resolve();
    });

    // Check after a delay if operations completed in expected order
    setTimeout(() => {
      // In original code with proper fallback, we expect all operations to complete
      // In mutated code with empty setImmediate and no MessageChannel fallback, some may hang
      expect(executionOrder).toContain('tick1');
      expect(executionOrder).toContain('tick2');
      expect(executionOrder).toContain('tick3');
      expect(executionOrder).toContain(1);
      expect(executionOrder).toContain(2);
      expect(executionOrder).toContain(3);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});