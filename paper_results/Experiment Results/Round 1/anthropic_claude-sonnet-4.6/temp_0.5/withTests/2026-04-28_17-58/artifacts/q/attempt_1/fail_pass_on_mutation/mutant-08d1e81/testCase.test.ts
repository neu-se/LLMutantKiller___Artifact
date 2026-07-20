import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection behavior with process.emit check", () => {
  it("should not attempt to call process.emit when process.emit is not a function", (done) => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to simulate an environment
    // where process.emit is not available
    (process as any).emit = undefined;
    
    Q.resetUnhandledRejections();
    
    let errorThrown = false;
    
    try {
      // Creating a rejection triggers trackRejection
      Q.reject(new Error("test rejection"));
    } catch (e) {
      errorThrown = true;
    }
    
    // Restore process.emit
    process.emit = originalEmit;
    
    // In the original code, the if condition guards against calling process.emit
    // when it's not a function, so no error should be thrown
    // In the mutated code (if (true)), it would try to call process.emit which is undefined
    // causing an error in the nextTick.runAfter callback
    
    // Give time for any async errors to surface
    setTimeout(() => {
      expect(errorThrown).toBe(false);
      // Clean up unhandled rejection
      Q.reject(new Error("test")).fail(() => {});
      Q.resetUnhandledRejections();
      done();
    }, 50);
  });
});