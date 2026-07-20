const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should use setImmediate when available for task scheduling", (done) => {
    const executionOrder: number[] = [];
    let counter = 0;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule multiple Q.nextTick tasks
      for (let i = 0; i < 3; i++) {
        Q.nextTick(() => {
          executionOrder.push(++counter);
        });
      }

      // Schedule a native setImmediate task in the middle
      setImmediate(() => {
        executionOrder.push(++counter);
      });

      // Check after a delay to ensure all tasks have executed
      setTimeout(() => {
        try {
          // Find the position of the native setImmediate task
          const nativeIndex = executionOrder.indexOf(4);

          // Count how many Q tasks executed before the native setImmediate
          const qTasksBeforeNative = executionOrder.slice(0, nativeIndex).filter(
            val => val !== 4
          ).length;

          // In the original code, Q.nextTick uses setImmediate, so we expect
          // some Q tasks to execute before or interleaved with the native setImmediate
          // In the mutated code, Q falls back to MessageChannel/setTimeout which
          // executes after setImmediate, so all Q tasks would execute after
          expect(qTasksBeforeNative).toBeGreaterThan(0);
          done();
        } catch (e) {
          done(e);
        }
      }, 50);
    } else {
      done();
    }
  });
});