const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle process.emit check with AND condition", async () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emitCalled = false;

    try {
      // Create a mock process.emit that tracks calls
      process.emit = function(...args: any[]) {
        emitCalled = true;
        return originalEmit?.apply(process, args);
      };

      // Create an object that is truthy but not a function
      const fakeProcess = {
        emit: "not a function"
      };

      // Temporarily replace global process with our fake
      const globalProcess = global.process;
      (global as any).process = fakeProcess;

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("Test error"));

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code: process.emit won't be called because of AND condition
      // In mutated code: process.emit will be called (causing error) because of OR condition
      expect(emitCalled).toBe(false);

    } finally {
      // Restore everything
      (global as any).process = globalProcess;
      process.emit = originalEmit;
    }
  });
});