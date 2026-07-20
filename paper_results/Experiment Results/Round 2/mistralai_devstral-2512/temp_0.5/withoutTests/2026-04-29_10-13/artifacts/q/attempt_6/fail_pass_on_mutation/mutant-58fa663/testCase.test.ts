const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not attempt to call process.emit when it's not a function", async () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emitCallCount = 0;

    try {
      // Replace process.emit with a spy that counts calls
      process.emit = function(...args: any[]) {
        emitCallCount++;
        return true;
      };

      // Create a rejected promise
      const deferred = Q.defer();
      deferred.reject(new Error("Test error"));

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // Now test the critical case: when process is an object but emit is not a function
      const fakeProcess = { emit: "not a function" };
      const globalAny = global as any;
      const originalGlobalProcess = globalAny.process;
      globalAny.process = fakeProcess;

      // Create another rejected promise
      const deferred2 = Q.defer();
      deferred2.reject(new Error("Test error 2"));

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code: emit won't be called because of AND condition
      // In mutated code: emit will be called (causing error) because of OR condition
      expect(emitCallCount).toBe(1); // Only the first case should call emit

      // Restore global.process
      globalAny.process = originalGlobalProcess;
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});