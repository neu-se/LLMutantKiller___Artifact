// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c8926c6/testCase.test.ts
import { Q } from "./q.js";

describe("Q library environment detection", () => {
  it("should correctly detect Node.js environment with process.nextTick", (done) => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking if process.nextTick is properly detected
    const originalProcess = global.process;

    // Create a mock process object that should be detected as Node.js
    global.process = {
      toString: () => "[object process]",
      nextTick: (callback) => {
        // Verify this is the real nextTick being used
        callback();
      }
    };

    // Create a promise and verify it uses process.nextTick
    let nextTickUsed = false;
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = function(callback) {
      nextTickUsed = true;
      originalNextTick.call(this, callback);
    };

    Q.resolve(42).then((value) => {
      expect(value).toBe(42);
      expect(nextTickUsed).toBe(true);
      global.process = originalProcess;
      done();
    });
  });
});