import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not call process.emit when process.emit is not a function", (done) => {
    const originalEmit = process.emit;
    let emitCallCount = 0;
    
    // Replace process.emit with a spy function
    (process as any).emit = function(...args: any[]) {
      emitCallCount++;
      return originalEmit.apply(process, args as any);
    };
    
    // Now make process.emit NOT a function to test the guard
    // We need to check: does the condition guard correctly?
    // Save the spy, then set to non-function
    const emitSpy = (process as any).emit;
    (process as any).emit = 42; // not a function
    
    Q.resetUnhandledRejections();
    
    // In original: && means condition is false, block skipped, no error
    // In mutated: || means condition is true (process IS object), block runs,
    // then nextTick.runAfter callback tries to call process.emit(...) -> TypeError
    
    let caughtError: Error | null = null;
    const originalUncaught = process.listeners('uncaughtException').slice();
    
    process.once('uncaughtException', (err) => {
      caughtError = err;
    });
    
    Q.reject(new Error("test"));
    
    setTimeout(() => {
      process.emit = originalEmit;
      
      // Original: no uncaught exception (guard prevented emit call)
      // Mutated: uncaught TypeError (tried to call non-function process.emit)
      expect(caughtError).toBeNull();
      done();
    }, 100);
  });
});