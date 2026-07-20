import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not throw when process.emit is not a function and a promise is rejected", async () => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to expose the mutation
    // Original code: typeof process === "object" && typeof process.emit === "function"
    //   -> condition false, no emit call, no error
    // Mutated code: typeof process === "object" || typeof process.emit === "function"
    //   -> condition true (because process is object), tries to call process.emit() which is not a function -> TypeError
    (process as any).emit = undefined;
    
    let caughtError: Error | null = null;
    
    try {
      // Create a rejected promise to trigger trackRejection
      const rejected = Q.reject(new Error("test rejection"));
      
      // Wait for async operations to complete
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });
    } catch (e) {
      caughtError = e as Error;
    } finally {
      // Restore process.emit
      process.emit = originalEmit;
    }
    
    // With original code: no error thrown because the guard prevents calling process.emit
    // With mutated code: TypeError because process.emit is undefined but condition passes
    expect(caughtError).toBeNull();
  });
});