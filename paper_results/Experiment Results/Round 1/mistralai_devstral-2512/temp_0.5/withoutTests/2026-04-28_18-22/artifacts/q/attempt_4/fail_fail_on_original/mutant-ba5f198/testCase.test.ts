const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should correctly detect and use setImmediate when available", (done) => {
    // Save original setImmediate and nextTick
    const originalSetImmediate = global.setImmediate;
    const originalProcessNextTick = process.nextTick;

    // Track which mechanism was used
    let setImmediateUsed = false;
    let nextTickUsed = false;

    // Mock setImmediate to track its usage
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      setImmediateUsed = true;
      return originalSetImmediate(callback);
    };

    // Mock process.nextTick to track its usage
    process.nextTick = function(callback: (...args: any[]) => void): any {
      nextTickUsed = true;
      return originalProcessNextTick(callback);
    };

    try {
      // Force re-evaluation of the async mechanism
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q");

      // Create a promise chain that will trigger async scheduling
      Q.resolve()
        .then(() => {
          // In the original code with setImmediate available, it should be used
          // The mutation would cause nextTick to be used instead
          expect(setImmediateUsed).toBe(true);
          expect(nextTickUsed).toBe(false);
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    } finally {
      // Restore originals
      global.setImmediate = originalSetImmediate;
      process.nextTick = originalProcessNextTick;
    }
  });
});