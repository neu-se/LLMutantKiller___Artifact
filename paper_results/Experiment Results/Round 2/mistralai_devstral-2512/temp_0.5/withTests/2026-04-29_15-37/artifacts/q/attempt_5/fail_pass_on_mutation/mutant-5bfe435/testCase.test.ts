// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should use process.nextTick when in a real Node.js environment", (done) => {
    // This test verifies that Q correctly detects and uses process.nextTick
    // The mutation changes the condition to always be false, preventing process.nextTick usage

    // We'll test by checking if Q.nextTick executes synchronously in the same way
    // that process.nextTick does in Node.js (before any I/O events)

    let nextTickExecuted = false;
    let timeoutExecuted = false;

    Q.nextTick(() => {
      nextTickExecuted = true;
    });

    // Schedule a timeout with 0 delay
    setTimeout(() => {
      timeoutExecuted = true;
    }, 0);

    // Schedule an immediate to check the state
    setImmediate(() => {
      // In a proper Node.js environment with process.nextTick:
      // - process.nextTick callbacks execute before setTimeout callbacks
      // - So nextTickExecuted should be true while timeoutExecuted is still false
      // If the mutation is present, Q.nextTick would use setImmediate or setTimeout,
      // causing different execution order

      if (!nextTickExecuted) {
        done(new Error("Q.nextTick did not execute before setImmediate - mutation detected"));
        return;
      }

      if (timeoutExecuted) {
        done(new Error("setTimeout executed before Q.nextTick - mutation detected"));
        return;
      }

      done();
    });
  });
});