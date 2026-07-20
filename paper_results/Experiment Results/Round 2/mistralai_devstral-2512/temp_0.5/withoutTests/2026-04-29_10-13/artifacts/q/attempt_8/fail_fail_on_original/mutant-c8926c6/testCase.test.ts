// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_8/pending_category/mutant-c8926c6/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library process.nextTick detection", () => {
  it("should use setImmediate when process.toString() is not '[object process]'", (done) => {
    // Store original globals
    const originalProcess = global.process;
    const originalSetImmediate = global.setImmediate;

    // Create a mock environment that mimics Browserify
    global.process = {
      toString: () => "[object Object]",
      nextTick: (callback: () => void) => {
        // This should NOT be used in original code
        callback();
      }
    } as any;

    // Track which mechanism is used
    let nextTickCalled = false;
    let setImmediateCalled = false;

    // Override nextTick to detect calls
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = function(callback: () => void) {
      nextTickCalled = true;
      originalNextTick.call(this, callback);
    };

    // Override setImmediate to detect calls
    global.setImmediate = function(callback: () => void) {
      setImmediateCalled = true;
      callback();
    } as any;

    // Create a deferred promise to force async operation
    const deferred = Q.defer();
    setTimeout(() => deferred.resolve(42), 0);

    deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      // In original code, setImmediate should be used (not nextTick)
      // because process.toString() !== "[object process]"
      expect(setImmediateCalled).toBe(true);
      expect(nextTickCalled).toBe(false);

      // Restore globals
      global.process = originalProcess;
      global.setImmediate = originalSetImmediate;
      done();
    });
  }, 2000);
});