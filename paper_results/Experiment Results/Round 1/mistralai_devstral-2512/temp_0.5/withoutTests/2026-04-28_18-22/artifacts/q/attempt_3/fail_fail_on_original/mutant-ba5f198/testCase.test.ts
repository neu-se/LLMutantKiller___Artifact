const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should correctly detect and use setImmediate when available", (done) => {
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

      // Create a promise chain that will trigger async scheduling
      Q.resolve()
        .then(() => {
          // In the original code, setImmediate should be used when available
          // The mutation would prevent this
          expect(setImmediateUsed).toBe(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});