// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js process.nextTick detection", () => {
  it("should correctly detect Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly detects a real Node.js environment
    // The mutation changes the condition to always be false, which would prevent
    // the library from using process.nextTick even in a real Node.js environment

    // We'll test by measuring the execution time difference between Q.nextTick
    // and setImmediate, which should be significant when process.nextTick is used

    const startTime = process.hrtime();

    Q.nextTick(() => {
      const nextTickTime = process.hrtime(startTime);

      setImmediate(() => {
        const immediateTime = process.hrtime(startTime);

        // Convert to nanoseconds
        const nextTickNs = nextTickTime[0] * 1e9 + nextTickTime[1];
        const immediateNs = immediateTime[0] * 1e9 + immediateTime[1];
        const diffNs = immediateNs - nextTickNs;

        // In a proper Node.js environment with process.nextTick:
        // - process.nextTick should execute much faster than setImmediate
        // - The difference should be measurable (typically several microseconds)
        // If the mutation is present, Q.nextTick would use setImmediate or setTimeout,
        // making the timing difference much smaller or non-existent

        if (diffNs < 1000) { // Less than 1 microsecond difference
          done(new Error(`Timing difference too small (${diffNs}ns) - mutation likely present`));
          return;
        }

        done();
      });
    });
  });
});