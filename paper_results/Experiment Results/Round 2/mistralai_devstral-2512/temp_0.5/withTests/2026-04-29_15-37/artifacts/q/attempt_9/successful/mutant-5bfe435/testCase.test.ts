// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should use process.nextTick when running in Node.js", (done) => {
    // This test verifies that Q correctly detects and uses process.nextTick
    // The mutation changes the condition to always be false, preventing process.nextTick usage

    // We'll test by checking the execution order between Q.nextTick and process.nextTick
    let qNextTickExecuted = false;
    let processNextTickExecuted = false;

    Q.nextTick(() => {
      qNextTickExecuted = true;
    });

    process.nextTick(() => {
      processNextTickExecuted = true;
      // In a proper Node.js environment, both should use the same mechanism
      // so they should execute in the same phase
      // If the mutation is present, Q.nextTick would use a different mechanism
      // causing different execution order
      if (!qNextTickExecuted) {
        done(new Error("process.nextTick executed before Q.nextTick - mutation detected"));
        return;
      }
      done();
    });
  });
});