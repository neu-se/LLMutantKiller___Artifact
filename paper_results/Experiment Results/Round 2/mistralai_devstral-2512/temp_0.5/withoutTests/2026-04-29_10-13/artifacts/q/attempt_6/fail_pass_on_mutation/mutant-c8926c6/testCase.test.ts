// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_6/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly detect Node.js environment by checking process.toString()", (done) => {
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

    // Track which async mechanism is used
    let nextTickUsed = false;
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = function(callback: () => void) {
      nextTickUsed = true;
      originalNextTick.call(this, callback);
    };

    // Create and resolve a promise
    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
      // In original code, nextTick should be used because process.toString() === "[object process]"
      expect(nextTickUsed).toBe(true);

      // Restore original process
      global.process = originalProcess;
      done();
    });
  }, 1000);
});