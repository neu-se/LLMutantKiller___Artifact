import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not throw when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    
    // Remove process.emit to simulate environment where it's not a function
    // @ts-ignore
    delete process.emit;
    
    try {
      // Create a rejected promise - this calls trackRejection internally
      const rejectedPromise = Q.reject(new Error("test rejection"));
      
      // Wait for async operations to complete
      await new Promise<void>((resolve) => {
        Q.nextTick.runAfter(() => {
          resolve();
        });
      });
      
      // If we get here without throwing, the original code handled it correctly
      // The mutated code would have thrown because it tries to call process.emit unconditionally
      expect(true).toBe(true);
    } finally {
      // Restore process.emit
      process.emit = originalEmit;
      // Clean up unhandled rejections
      Q.resetUnhandledRejections();
    }
  });
});