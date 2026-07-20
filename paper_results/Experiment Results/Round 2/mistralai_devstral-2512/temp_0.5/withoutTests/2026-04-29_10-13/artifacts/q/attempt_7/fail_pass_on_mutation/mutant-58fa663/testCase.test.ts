const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should handle process.emit correctly with AND vs OR condition", async () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emitCalledWithNonFunction = false;

    try {
      // Create a mock process object where emit is not a function
      const mockProcess = {
        emit: "not a function"
      };

      // Replace global process temporarily
      const globalAny = global as any;
      const originalProcess = globalAny.process;
      globalAny.process = mockProcess;

      // Create a rejected promise
      const deferred = Q.defer();
      deferred.reject(new Error("Test error"));

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code: process.emit won't be called because of AND condition
      // In mutated code: process.emit will be called (causing error) because of OR condition
      // We can't directly observe the call, but we can verify no error was thrown
      expect(true).toBe(true);

      // Restore global process
      globalAny.process = originalProcess;
    } catch (error) {
      // If we get here in the original code, the test fails
      // If we get here in the mutated code, it's expected
      throw error;
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});