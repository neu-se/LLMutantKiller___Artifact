const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", async () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emitCalled = false;

    try {
      // Replace process.emit with a spy
      process.emit = function(...args: any[]) {
        emitCalled = true;
        return true;
      };

      // Create a rejected promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test error"));

      // Handle the rejection to trigger untracking
      promise.catch(() => {});

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // Now test the critical case: when process is an object but emit is not a function
      const fakeProcess = { emit: "not a function" };
      const globalAny = global as any;
      const originalProcess = globalAny.process;
      globalAny.process = fakeProcess;

      // Create another rejected promise
      const deferred2 = Q.defer();
      const promise2 = deferred2.promise;
      deferred2.reject(new Error("Test error 2"));

      // Handle the rejection to trigger untracking
      promise2.catch(() => {});

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code: emit won't be called for the second case because of AND condition
      // In mutated code: emit will be called for the second case because of OR condition
      expect(emitCalled).toBe(false);

      // Restore global process
      globalAny.process = originalProcess;
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});