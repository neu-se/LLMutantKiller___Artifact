// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_9/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library process.nextTick detection", () => {
  it("should correctly detect Node.js environment using process.toString() check", (done) => {
    // Store original process
    const originalProcess = global.process;

    // Create a mock process that should be detected as Node.js
    global.process = {
      toString: () => "[object process]",
      nextTick: (callback: () => void) => {
        callback();
      },
      domain: undefined
    };

    // Track nextTick calls
    let nextTickCalled = false;
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = function(callback: () => void) {
      nextTickCalled = true;
      originalNextTick.call(this, callback);
    };

    // Use Q.nextTick directly to test the environment detection
    Q.nextTick(() => {
      // In original code, this should use process.nextTick
      expect(nextTickCalled).toBe(true);

      // Restore original process
      global.process = originalProcess;
      done();
    });
  }, 1000);
});