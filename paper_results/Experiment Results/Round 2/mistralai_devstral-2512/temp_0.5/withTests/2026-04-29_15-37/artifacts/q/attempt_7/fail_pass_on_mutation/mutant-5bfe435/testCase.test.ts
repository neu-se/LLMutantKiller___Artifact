// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should use process.nextTick in Node.js environment", (done) => {
    // This test verifies that Q correctly detects and uses process.nextTick
    // The mutation changes the condition to always be false, preventing process.nextTick usage

    // We'll test by checking if Q.nextTick maintains the proper execution order
    // that's characteristic of process.nextTick in Node.js

    const executionOrder: string[] = [];

    // Schedule multiple operations to observe the execution order
    Q.nextTick(() => {
      executionOrder.push('q1');
      Q.nextTick(() => {
        executionOrder.push('q2');
      });
    });

    // Use setImmediate as a reference point
    setImmediate(() => {
      executionOrder.push('immediate');

      // In a proper Node.js environment with process.nextTick:
      // All Q.nextTick operations should complete before setImmediate
      // If the mutation is present, Q.nextTick would use setImmediate or setTimeout,
      // causing them to execute after our setImmediate callback

      const qCount = executionOrder.filter(x => x.startsWith('q')).length;
      const immediateIndex = executionOrder.indexOf('immediate');

      if (immediateIndex < 2) { // setImmediate executed before both Q.nextTick calls
        done(new Error(`setImmediate executed too early (at index ${immediateIndex}) - mutation detected`));
        return;
      }

      if (qCount !== 2) {
        done(new Error(`Expected 2 Q.nextTick executions but got ${qCount} - mutation detected`));
        return;
      }

      done();
    });
  });
});