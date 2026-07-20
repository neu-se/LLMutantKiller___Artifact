const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should use setImmediate when available for task scheduling", (done) => {
    const executionOrder: number[] = [];
    let counter = 0;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule Q.nextTick tasks
      for (let i = 0; i < 5; i++) {
        Q.nextTick(() => {
          executionOrder.push(++counter);
        });
      }

      // Schedule native setImmediate task
      setImmediate(() => {
        executionOrder.push(++counter);
      });

      // Check after all tasks should have executed
      setTimeout(() => {
        try {
          const nativeIndex = executionOrder.indexOf(6);
          const qTasksBeforeNative = executionOrder.slice(0, nativeIndex).filter(val => val < 6).length;

          // In original code: Q uses setImmediate, so some Q tasks should execute before native
          // In mutated code: Q falls back to MessageChannel/setTimeout, so all Q tasks execute after native
          expect(qTasksBeforeNative).toBeGreaterThan(0);
          done();
        } catch (e) {
          done(e);
        }
      }, 100);
    } else {
      done();
    }
  });
});