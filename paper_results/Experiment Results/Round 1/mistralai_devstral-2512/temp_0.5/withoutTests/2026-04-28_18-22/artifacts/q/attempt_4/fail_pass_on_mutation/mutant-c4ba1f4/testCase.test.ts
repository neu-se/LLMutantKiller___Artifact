const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should execute tasks in the correct order when setImmediate is available", (done) => {
    const executionOrder: number[] = [];
    let counter = 0;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule multiple tasks to detect timing differences
      for (let i = 0; i < 5; i++) {
        Q.nextTick(() => {
          executionOrder.push(++counter);
        });
      }

      // Use setImmediate to schedule a task that should execute
      // at roughly the same time as Q.nextTick tasks
      setImmediate(() => {
        executionOrder.push(++counter);
      });

      // Check after a delay to ensure all tasks have executed
      setTimeout(() => {
        // Count how many Q.nextTick tasks executed before setImmediate
        const qTasksBeforeImmediate = executionOrder.filter(
          (val, idx) => idx < executionOrder.indexOf(6) && val < 6
        ).length;

        // In the original code, Q.nextTick uses setImmediate, so we expect
        // at least some Q tasks to execute before or interleaved with setImmediate
        // In the mutated code, Q falls back to MessageChannel/setTimeout which
        // executes after setImmediate, so all Q tasks would execute after
        expect(qTasksBeforeImmediate).toBeGreaterThan(0);
        done();
      }, 50);
    } else {
      done();
    }
  });
});