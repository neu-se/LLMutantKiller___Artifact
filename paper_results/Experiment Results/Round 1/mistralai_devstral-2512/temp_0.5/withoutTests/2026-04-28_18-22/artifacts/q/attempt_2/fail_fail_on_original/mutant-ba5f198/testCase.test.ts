import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q async scheduling behavior", () => {
  it("should correctly detect and use setImmediate when available", (done) => {
    // Save original setImmediate and nextTick
    const originalSetImmediate = global.setImmediate;
    const originalProcessNextTick = process.nextTick;

    // Track which mechanism was used
    let mechanismUsed: string | null = null;

    // Mock setImmediate to track its usage
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      mechanismUsed = "setImmediate";
      return originalSetImmediate(callback);
    };

    // Mock process.nextTick to track its usage
    process.nextTick = function(callback: (...args: any[]) => void): any {
      if (mechanismUsed === null) {
        mechanismUsed = "nextTick";
      }
      return originalProcessNextTick(callback);
    };

    try {
      // Create a deferred and resolve it to trigger async scheduling
      const deferred = Q.defer();
      const startTime = Date.now();

      deferred.promise.then(() => {
        const elapsed = Date.now() - startTime;

        // setImmediate should be used when available (which it is in our mock)
        // The mutation would cause it to NOT be used even when available
        expect(mechanismUsed).toBe("setImmediate");

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
      // Restore originals
      global.setImmediate = originalSetImmediate;
      process.nextTick = originalProcessNextTick;
    }
  });
});