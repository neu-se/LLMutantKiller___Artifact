import { Q } from "./q";

describe("Q library process detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly detects a Node.js environment
    // and uses process.nextTick for scheduling. The mutation changes the
    // condition to always false, which would cause Q to fall back to other
    // scheduling mechanisms (setImmediate, MessageChannel, or setTimeout).

    // We can observe this by checking if the scheduling behavior matches
    // process.nextTick's characteristics. In Node.js, process.nextTick has
    // higher priority than setImmediate and will execute before I/O events.

    let executionOrder = [];
    const q = Q;

    // Schedule a task using Q.nextTick (which should use process.nextTick in Node.js)
    q.nextTick(() => {
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