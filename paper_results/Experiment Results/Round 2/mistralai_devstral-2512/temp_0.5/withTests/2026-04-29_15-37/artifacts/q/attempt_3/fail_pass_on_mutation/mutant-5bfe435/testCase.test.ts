// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should use process.nextTick in a real Node.js environment", (done) => {
    // This test verifies that Q correctly detects and uses process.nextTick in Node.js
    // The mutation changes the condition to always be false, preventing process.nextTick usage

    // We'll test by checking if Q.nextTick behaves like process.nextTick
    // (executes before I/O events) rather than setImmediate or setTimeout

    let nextTickExecuted = false;
    let immediateExecuted = false;

    Q.nextTick(() => {
      nextTickExecuted = true;
      // In proper Node.js with process.nextTick, this should execute before setImmediate
      expect(immediateExecuted).toBe(false);
    });

    setImmediate(() => {
      immediateExecuted = true;
      // If we get here and nextTick hasn't executed yet, the mutation is present
      // (because it would force Q to use setImmediate or setTimeout instead of process.nextTick)
      if (!nextTickExecuted) {
        done(new Error("Q.nextTick did not execute before setImmediate - mutation detected"));
        return;
      }
      done();
    });
  });
});