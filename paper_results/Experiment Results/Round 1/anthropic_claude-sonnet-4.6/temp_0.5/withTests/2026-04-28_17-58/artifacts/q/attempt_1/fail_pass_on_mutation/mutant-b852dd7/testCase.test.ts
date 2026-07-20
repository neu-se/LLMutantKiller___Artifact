import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit check", () => {
  it("should not throw when process.emit is not a function but process is an object", (done) => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to distinguish original from mutated code
    // Original: typeof process.emit === "function" → false → skip the block
    // Mutated: true → always enter block → try to call process.emit → TypeError
    (process as any).emit = undefined;
    
    let errorThrown = false;
    
    Q.resetUnhandledRejections();
    
    // Create a rejected promise which triggers trackRejection
    Q.reject(new Error("test rejection"));
    
    // Use nextTick to allow the async operations to run
    Q.nextTick(function() {
      Q.nextTick.runAfter(function() {
        (process as any).emit = originalEmit;
        
        // If we get here without error, the original code is running
        // (the process.emit check correctly prevented calling undefined as a function)
        expect(errorThrown).toBe(false);
        
        Q.resetUnhandledRejections();
        done();
      });
    });
    
    // Listen for uncaught errors that would indicate the mutation
    const originalUncaughtException = process.listeners("uncaughtException").slice();
    
    process.once("uncaughtException", function(err) {
      errorThrown = true;
      (process as any).emit = originalEmit;
      Q.resetUnhandledRejections();
      // In mutated code, calling undefined() throws TypeError
      // This should not happen in original code
      done.fail(err);
    });
  });
});