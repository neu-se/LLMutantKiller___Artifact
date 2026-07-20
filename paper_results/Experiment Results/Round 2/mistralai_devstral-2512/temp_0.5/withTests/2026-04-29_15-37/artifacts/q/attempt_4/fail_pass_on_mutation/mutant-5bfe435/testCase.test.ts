// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should correctly identify Node.js environment by checking process.nextTick behavior", (done) => {
    // This test verifies that Q correctly detects a real Node.js environment
    // The mutation changes the condition to always be false, which would prevent
    // the library from properly detecting Node.js and using process.nextTick

    // We'll test by creating a scenario where the difference between process.nextTick
    // and other scheduling mechanisms becomes observable

    let executionOrder = [];

    // Schedule multiple operations to observe timing differences
    for (let i = 0; i < 10; i++) {
      Q.nextTick(() => {
        executionOrder.push('q');
      });
    }

    // Use setImmediate as a reference point
    setImmediate(() => {
      executionOrder.push('i');

      // Count how many Q.nextTick operations completed before setImmediate
      const qBeforeI = executionOrder.filter(x => x === 'q').length;

      // In a proper Node.js environment with process.nextTick, all or most Q.nextTick
      // operations should complete before setImmediate
      // If the mutation is present, Q would use setImmediate or setTimeout instead,
      // causing them to execute after our setImmediate callback
      if (qBeforeI < 5) {
        done(new Error(`Only ${qBeforeI} Q.nextTick operations completed before setImmediate - mutation likely present`));
        return;
      }

      done();
    });
  });
});