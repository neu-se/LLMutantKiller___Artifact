import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit check", () => {
  it("should not throw when process.emit is not a function and a rejection is handled", async () => {
    // Save original process.emit
    const originalEmit = process.emit;
    
    try {
      // Replace process.emit with a non-function to expose the mutation
      // In original code: typeof process.emit === "function" check prevents calling it
      // In mutated code: the check is replaced with `true`, so it tries to call process.emit
      (process as any).emit = "not-a-function";
      
      // Create a rejected promise that will be tracked as unhandled
      const deferred = Q.defer();
      deferred.reject(new Error("test rejection"));
      
      // Now handle the rejection - this triggers untrackRejection
      // In mutated code, this will try to call process.emit("rejectionHandled", ...) 
      // which will throw because process.emit is now a string
      let caughtError: Error | null = null;
      try {
        await deferred.promise.catch(() => {
          // handled
        });
        // Wait for async operations to complete
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (e) {
        caughtError = e as Error;
      }
      
      // In original code: no error because process.emit function check prevents calling it
      // In mutated code: error because it tries to call a non-function
      expect(caughtError).toBeNull();
    } finally {
      // Restore process.emit
      (process as any).emit = originalEmit;
    }
  });
});