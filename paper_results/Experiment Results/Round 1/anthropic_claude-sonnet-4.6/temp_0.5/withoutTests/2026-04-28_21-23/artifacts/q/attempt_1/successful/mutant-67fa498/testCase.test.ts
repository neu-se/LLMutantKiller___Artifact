import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter", () => {
  it("should execute tasks added via runAfter after the main queue is flushed", (done) => {
    let runAfterExecuted = false;

    Q.nextTick.runAfter(function () {
      runAfterExecuted = true;
    });

    // Schedule a check after giving the event loop time to process
    // The runAfter task should have been executed by the time we check
    Q.nextTick(function () {
      // After the main queue flushes, runAfter tasks should have run
      // We need to wait one more tick to ensure the laterQueue is processed
      setTimeout(function () {
        expect(runAfterExecuted).toBe(true);
        done();
      }, 50);
    });
  });
});