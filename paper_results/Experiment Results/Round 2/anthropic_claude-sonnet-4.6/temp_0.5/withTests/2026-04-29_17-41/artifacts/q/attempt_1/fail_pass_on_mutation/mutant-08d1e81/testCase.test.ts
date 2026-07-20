import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not throw when process.emit is not a function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to simulate the condition
    // In the original code: typeof process.emit === "function" check prevents calling it
    // In the mutated code: the check is bypassed (if (true)), so it tries to call process.emit
    // even when it's not a function, causing a TypeError
    (process as any).emit = "not-a-function";
    
    Q.resetUnhandledRejections();
    
    let errorCaught = false;
    const originalOnerror = Q.onerror;
    
    try {
      // Creating a rejection triggers trackRejection which calls Q.nextTick.runAfter
      // In the mutated code, it will try to call process.emit("unhandledRejection", ...)
      // but process.emit is not a function, so it will throw
      Q.reject(new Error("test rejection"));
    } catch (e) {
      errorCaught = true;
    }
    
    // Restore process.emit
    (process as any).emit = originalEmit;
    
    // The rejection should have been tracked without error
    const reasons = Q.getUnhandledReasons();
    
    // In original code: no error thrown because the typeof check prevents calling non-function emit
    // In mutated code: would throw because it tries to call "not-a-function"(...)
    expect(errorCaught).toBe(false);
    expect(reasons.length).toBe(1);
    
    Q.resetUnhandledRejections();
    done();
  });
});