// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", (done) => {
    // This test verifies that the library correctly detects a real Node.js environment
    // The mutation changes the condition to always evaluate to false, which would
    // prevent the library from using process.nextTick even in a real Node.js environment

    // We can't directly test the internal implementation, but we can test the observable behavior
    // In a real Node.js environment, Q.nextTick should use process.nextTick which executes
    // before setImmediate and setTimeout

    let executionOrder = [];

    Q.nextTick(() => {
      executionOrder.push('qNextTick');
    });

    setImmediate(() => {
      executionOrder.push('setImmediate');
      // Give a small delay to ensure all microtasks are processed
      setTimeout(() => {
        // In a proper Node.js environment with process.nextTick, Q.nextTick should execute first
        // If the mutation is present and forces the library to not use process.nextTick,
        // the order might be different
        expect(executionOrder[0]).toBe('qNextTick');
        done();
      }, 10);
    });
  });
});