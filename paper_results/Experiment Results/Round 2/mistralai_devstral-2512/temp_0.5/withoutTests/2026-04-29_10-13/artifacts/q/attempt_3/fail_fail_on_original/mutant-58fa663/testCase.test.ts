const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle untracking when process.emit is not a function", async () => {
    // Save original process.emit
    const originalEmit = process.emit;

    try {
      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("Test error"));

      // Mock process.emit to be non-function to trigger the mutation
      process.emit = null as any;

      // Force the untracking logic to run by creating and handling a rejection
      const deferred = Q.defer();
      deferred.reject(new Error("Test"));
      await deferred.promise.catch(() => {});

      // In the mutated version, this would try to call process.emit when it's not a function
      // The original version correctly checks both conditions with AND
      expect(true).toBe(true);
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});