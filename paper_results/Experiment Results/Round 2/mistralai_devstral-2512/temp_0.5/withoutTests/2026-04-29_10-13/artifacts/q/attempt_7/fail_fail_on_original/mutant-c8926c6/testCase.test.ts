// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_7/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should fail when process.toString() check is bypassed in non-Node environment", (done) => {
    // Store original globals
    const originalProcess = global.process;
    const originalSetImmediate = global.setImmediate;

    // Create a mock environment that should NOT be detected as Node.js
    // but has process.nextTick available (like Browserify)
    global.process = {
      toString: () => "[object Object]",  // Not a real Node process
      nextTick: (callback: () => void) => {
        // This should NOT be used in original code
        callback();
      }
    } as any;

    // Mock setImmediate to detect if it's being used as fallback
    let setImmediateUsed = false;
    global.setImmediate = function(callback: () => void) {
      setImmediateUsed = true;
      callback();
    } as any;

    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
      // In original code, setImmediate should be used as fallback
      // In mutated code, process.nextTick will be used incorrectly
      expect(setImmediateUsed).toBe(true);

      // Restore globals
      global.process = originalProcess;
      global.setImmediate = originalSetImmediate;
      done();
    });
  }, 1000);
});