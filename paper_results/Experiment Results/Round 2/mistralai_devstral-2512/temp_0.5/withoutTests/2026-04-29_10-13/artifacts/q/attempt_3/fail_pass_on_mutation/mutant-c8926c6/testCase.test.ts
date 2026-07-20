// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_3/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly detect Node.js environment with process.nextTick", (done) => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking if process.nextTick is properly detected
    const originalProcess = global.process;

    // Create a mock process object that should be detected as Node.js
    global.process = {
      toString: () => "[object process]",
      nextTick: (callback: () => void) => {
        callback();
      }
    };

    // Create a promise and verify it uses process.nextTick
    let nextTickUsed = false;
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = function(callback: () => void) {
      nextTickUsed = true;
      originalNextTick.call(this, callback);
    };

    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
      expect(nextTickUsed).toBe(true);
      global.process = originalProcess;
      done();
    });
  });
});