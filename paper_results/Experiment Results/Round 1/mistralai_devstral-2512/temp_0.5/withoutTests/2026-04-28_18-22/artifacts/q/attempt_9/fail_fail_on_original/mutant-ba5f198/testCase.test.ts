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

      deferred.promise.then(() => {
        // In the original code, setImmediate should be used when available
        // The mutation would cause it to NOT be used even when available
        expect(setImmediateUsed).toBe(true);
        done();
      });

      // Resolve immediately to trigger async scheduling
      deferred.resolve("test");
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});