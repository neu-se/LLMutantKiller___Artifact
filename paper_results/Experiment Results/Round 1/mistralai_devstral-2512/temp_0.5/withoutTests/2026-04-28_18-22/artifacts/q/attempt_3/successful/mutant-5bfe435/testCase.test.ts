const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library process detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly detects a Node.js environment
    // and uses process.nextTick for scheduling. The mutation changes the
    // condition to always false, which would cause Q to fall back to other
    // scheduling mechanisms (setImmediate, MessageChannel, or setTimeout).

    let executionOrder = [];

    // Schedule a task using Q.nextTick (which should use process.nextTick in Node.js)
    Q.nextTick(() => {
      executionOrder.push("q.nextTick");
      if (executionOrder[0] === "q.nextTick") {
        // In Node.js with process.nextTick, this should execute first
        done();
      } else {
        // If the mutation is present, Q.nextTick might use setImmediate or setTimeout
        // which would execute after process.nextTick callbacks
        done(new Error("Q.nextTick did not execute with process.nextTick priority"));
      }
    });

    // Schedule a task using process.nextTick directly
    process.nextTick(() => {
      executionOrder.push("process.nextTick");
    });
  });
});