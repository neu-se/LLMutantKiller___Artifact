// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_5/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should use setImmediate fallback when process.toString() is not '[object process]'", (done) => {
    // Store original globals
    const originalProcess = global.process;
    const originalSetImmediate = global.setImmediate;

    // Create a mock environment that should trigger setImmediate fallback
    global.process = {
      toString: () => "[object Object]",  // Not a real Node process
      nextTick: null  // No nextTick available
    } as any;

    // Mock setImmediate to detect if it's being used
    let setImmediateUsed = false;
    global.setImmediate = function(callback: () => void) {
      setImmediateUsed = true;
      // Call the callback immediately for test purposes
      callback();
    };

    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
      // In original code, setImmediate should be used as fallback
      expect(setImmediateUsed).toBe(true);

      // Restore globals
      global.process = originalProcess;
      global.setImmediate = originalSetImmediate;
      done();
    });
  }, 1000);
});