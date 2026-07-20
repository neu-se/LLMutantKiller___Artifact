describe("Q node environment detection", () => {
  it("uses process.toString() to verify real Node environment before using process.nextTick", (done) => {
    const origToString = process.toString;
    const origNextTick = process.nextTick;

    // Simulate Browserify-like fake process
    (process as any).toString = () => "[object Object]";

    let nextTickCallCount = 0;
    (process as any).nextTick = function (fn: (...args: any[]) => void, ...args: any[]) {
      nextTickCallCount++;
      return origNextTick.call(process, fn, ...args);
    };

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore toString right after module evaluation
    (process as any).toString = origToString;
    // Reset counter - don't count calls during module initialization
    nextTickCallCount = 0;

    // Trigger Q's internal nextTick/flush mechanism
    const deferred = Q.defer();
    deferred.resolve(42);
    deferred.promise.then(() => {});

    // Wait long enough for async scheduling to complete
    setTimeout(() => {
      const count = nextTickCallCount;
      (process as any).nextTick = origNextTick;
      delete require.cache[qPath];

      // Original code: process.toString() === "[object Object]" !== "[object process]"
      //   => isNodeJS = false => requestTick = setImmediate (not process.nextTick)
      //   => nextTickCallCount === 0
      // Mutated code: condition is `true` regardless of toString
      //   => isNodeJS = true => requestTick = process.nextTick
      //   => nextTickCallCount > 0
      expect(count).toBe(0);
      done();
    }, 100);
  });
});