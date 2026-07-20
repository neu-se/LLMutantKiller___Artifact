const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should use setImmediate when available for promise resolution", (done) => {
    // Save original setImmediate
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    // Mock setImmediate to track its usage
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      setImmediateUsed = true;
      return originalSetImmediate(callback);
    };

    try {
      // Force re-evaluation of the async mechanism
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q");

      // Create a deferred and resolve it to trigger async scheduling
      const deferred = Q.defer();
      const startTime = Date.now();

      deferred.promise.then(() => {
        const elapsed = Date.now() - startTime;

        // setImmediate should be used when available (which it is in our mock)
        // The mutation would cause it to NOT be used even when available
        expect(setImmediateUsed).toBe(true);

        // Additional check: setImmediate typically fires before setTimeout(0)
        // but after nextTick in Node.js
        expect(elapsed).toBeLessThan(10);

        done();
      });

      // Resolve after a tiny delay to ensure async scheduling is triggered
      setTimeout(() => {
        deferred.resolve("test");
      }, 0);
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});