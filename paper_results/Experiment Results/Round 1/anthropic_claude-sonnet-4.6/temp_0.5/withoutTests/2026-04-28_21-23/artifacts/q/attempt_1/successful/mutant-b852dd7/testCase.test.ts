import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit check", () => {
  it("should not throw when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to test the typeof check
    // Original code checks: typeof process.emit === "function"
    // Mutated code skips this check (uses `true` instead)
    (process as any).emit = "not-a-function";
    
    let error: Error | null = null;
    
    try {
      // Create a rejected promise - this triggers trackRejection
      // which will try to call process.emit in a nextTick.runAfter
      const rejectedPromise = Q.reject(new Error("test rejection"));
      
      // Wait for the async operations to complete
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });
    } catch (e) {
      error = e as Error;
    } finally {
      // Restore process.emit
      (process as any).emit = originalEmit;
    }
    
    // In the original code, typeof process.emit === "function" is false,
    // so process.emit is never called - no error should occur.
    // In the mutated code, `true` replaces the check, so process.emit("unhandledRejection", ...)
    // would be called on a string, causing a TypeError.
    expect(error).toBeNull();
  });
});