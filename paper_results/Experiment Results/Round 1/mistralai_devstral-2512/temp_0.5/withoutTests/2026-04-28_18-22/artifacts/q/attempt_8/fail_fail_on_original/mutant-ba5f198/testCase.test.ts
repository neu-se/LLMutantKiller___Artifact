const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should correctly detect setImmediate availability", () => {
    // Save original setImmediate
    const originalSetImmediate = global.setImmediate;
    let detectionResult: boolean | null = null;

    // Mock setImmediate to track detection
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      // This will be called during Q's initialization when it checks for setImmediate
      detectionResult = true;
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
      expect(detectionResult).toBe(true);
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});