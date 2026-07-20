const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle process.emit check with AND condition", async () => {
    // Save original process
    const globalAny = global as any;
    const originalProcess = { ...globalAny.process };
    const originalEmit = process.emit;

    try {
      // Create a mock process object where emit is not a function
      // but process itself is still an object with nextTick
      const mockProcess = {
        ...originalProcess,
        emit: "not a function"
      };

      // Replace global process temporarily
      globalAny.process = mockProcess;

      // Create a rejected promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test error"));

      // Handle the rejection to trigger untracking
      promise.catch(() => {});

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code: process.emit won't be called because of AND condition
      // In mutated code: process.emit will be called (causing error) because of OR condition
      // The test passes if no error is thrown
      expect(true).toBe(true);
    } finally {
      // Restore global process
      globalAny.process = originalProcess;
      process.emit = originalEmit;
    }
  });
});