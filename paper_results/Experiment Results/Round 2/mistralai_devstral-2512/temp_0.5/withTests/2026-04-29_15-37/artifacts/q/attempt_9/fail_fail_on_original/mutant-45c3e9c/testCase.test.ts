import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks in the same event loop turn", (done) => {
    let executionOrder: number[] = [];
    let syncOperationComplete = false;

    // Synchronous operation
    executionOrder.push(1);
    syncOperationComplete = true;

    // Asynchronous operation via nextTick
    Q.nextTick(() => {
      executionOrder.push(2);
      expect(executionOrder).toEqual([1, 2]);
      expect(syncOperationComplete).toBe(true);
      done();
    });

    // This should be false in original code (task not yet executed)
    // but will be true in mutated code if tasks aren't being flushed
    executionOrder.push(3);
  });
});