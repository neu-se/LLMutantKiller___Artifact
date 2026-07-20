// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_4/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly identify non-Node.js environment when process.toString() is not '[object process]'", (done) => {
    // This test verifies that Q correctly identifies non-Node.js environments
    // by checking that it doesn't use process.nextTick when process.toString() doesn't return "[object process]"
    const originalProcess = global.process;

    // Create a mock process object that should NOT be detected as Node.js
    global.process = {
      toString: () => "[object Object]",  // This is what Browserify returns
      nextTick: (callback: () => void) => {
        // This should NOT be used in the original code
        callback();
      }
    };

    // Track if nextTick was called
    let nextTickCalled = false;
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = function(callback: () => void) {
      nextTickCalled = true;
      originalNextTick.call(this, callback);
    };

    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
      // In the original code, nextTick should NOT be called because process.toString() !== "[object process]"
      expect(nextTickCalled).toBe(false);
      global.process = originalProcess;
      done();
    });
  });
});