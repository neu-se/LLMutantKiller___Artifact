// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly detects a real Node.js environment
    // The mutation changes the condition to always be false, which would prevent
    // the library from using process.nextTick even in a real Node.js environment

    // We'll test by checking if Q.nextTick executes in the same event loop phase
    // as process.nextTick (before I/O events)

    let nextTickExecuted = false;
    let ioEventExecuted = false;

    Q.nextTick(() => {
      nextTickExecuted = true;
      // In proper Node.js with process.nextTick, this should execute
      // before any I/O events (like setImmediate)
      expect(ioEventExecuted).toBe(false);
    });

    // Create an I/O event using setImmediate
    setImmediate(() => {
      ioEventExecuted = true;
      // If we get here and nextTick hasn't executed yet, the mutation is present
      // (because it would force Q to use setImmediate or setTimeout instead of process.nextTick)
      if (!nextTickExecuted) {
        done(new Error("Q.nextTick did not execute before I/O event - mutation detected"));
        return;
      }
      done();
    });
  });
});