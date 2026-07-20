const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should correctly detect and use setImmediate when available", () => {
    // Save original setImmediate
    const originalSetImmediate = global.setImmediate;
    let setImmediateDetected = false;

    // Mock setImmediate to track detection during Q initialization
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      setImmediateDetected = true;
      return originalSetImmediate(callback);
    };

    try {
      // Force re-evaluation of the async mechanism
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q");

      // Create a simple promise to ensure Q is initialized
      const promise = Q.resolve();

      // The original code should detect setImmediate as available
      // The mutation would incorrectly detect it as not available
      expect(setImmediateDetected).toBe(true);

      // Return the promise to let Jest wait for it
      return promise;
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});