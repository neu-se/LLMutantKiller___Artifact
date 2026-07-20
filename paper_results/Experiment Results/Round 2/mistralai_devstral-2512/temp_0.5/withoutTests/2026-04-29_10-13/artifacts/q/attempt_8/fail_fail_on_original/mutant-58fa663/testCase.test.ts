const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not throw when process.emit is not a function", async () => {
    // Save original process.emit
    const originalEmit = process.emit;

    try {
      // Create a rejected promise
      const deferred = Q.defer();
      deferred.reject(new Error("Test error"));

      // Wait for the unhandled rejection tracking to process
      await new Promise(resolve => setTimeout(resolve, 10));

      // Now test the critical case: when process is an object but emit is not a function
      const fakeProcess = { emit: "not a function" };
      const globalAny = global as any;
      const originalProcess = globalAny.process;
      globalAny.process = fakeProcess;

      // Create another rejected promise that will trigger the untracking logic
      const deferred2 = Q.defer();
      const promise2 = deferred2.promise;
      deferred2.reject(new Error("Test error 2"));

      // Handle the rejection to trigger untracking
      promise2.catch(() => {});

      // Wait for async handling
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code: this should not throw because of AND condition
      // In mutated code: this will throw because of OR condition
      // Restore global process
      globalAny.process = originalProcess;
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});