import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit check", () => {
  it("should not throw when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to test the guard condition
    // Original code: checks typeof process.emit === "function" before calling
    // Mutated code: skips this check (uses `true` instead), so it will try to call
    // a non-function and throw TypeError
    (process as any).emit = "not-a-function";
    
    let caughtError: Error | null = null;
    
    try {
      // Create a rejected promise - this triggers trackRejection internally
      const rejectedPromise = Q.reject(new Error("test rejection"));
      
      // Wait for the next tick processing to complete
      await new Promise<void>((resolve) => {
        Q.nextTick(function() {
          Q.nextTick(function() {
            resolve();
          });
        });
      });
    } catch (e) {
      caughtError = e as Error;
    } finally {
      // Restore original emit
      process.emit = originalEmit;
    }
    
    // In original code: the typeof check prevents calling process.emit when it's not a function
    // In mutated code: it tries to call "not-a-function"() which throws TypeError
    expect(caughtError).toBeNull();
  });
});