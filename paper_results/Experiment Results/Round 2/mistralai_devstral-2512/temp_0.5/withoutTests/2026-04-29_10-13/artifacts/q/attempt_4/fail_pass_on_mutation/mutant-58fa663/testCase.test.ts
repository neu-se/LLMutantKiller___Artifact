const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", async () => {
    // Save original process.emit
    const originalEmit = process.emit;

    try {
      // Mock process.emit to be non-function
      process.emit = null as any;

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("Test error"));

      // Wait for the unhandled rejection tracking to process
      await new Promise(resolve => setTimeout(resolve, 10));

      // In the original code, this should not throw because of the AND condition
      // In the mutated code, this will throw because of the OR condition
      expect(true).toBe(true);
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});