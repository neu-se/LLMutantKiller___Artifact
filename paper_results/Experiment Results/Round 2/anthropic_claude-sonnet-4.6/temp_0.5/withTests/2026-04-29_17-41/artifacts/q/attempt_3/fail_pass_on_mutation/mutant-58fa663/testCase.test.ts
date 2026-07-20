import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection && vs || mutation", () => {
  it("does not cause uncaught exception when process.emit is not a function", (done) => {
    Q.resetUnhandledRejections();

    // We need the rejection to be "reported" first (added to reportedUnhandledRejections)
    // This happens in trackRejection's runAfter callback when process.emit("unhandledRejection") is called
    // Then when handled, untrackRejection's runAfter calls process.emit("rejectionHandled")
    
    const originalEmit = process.emit.bind(process);
    let unhandledRejectionReported = false;
    
    // First let the rejection be reported normally
    const error = new Error("test for mutation");
    const rejected = Q.reject(error);
    
    // Wait for the unhandledRejection to be emitted, then replace emit
    process.once('unhandledRejection', function() {
      unhandledRejectionReported = true;
      
      // Now replace emit with non-function
      Object.defineProperty(process, 'emit', {
        value: "not a function",
        configurable: true,
        writable: true  
      });
      
      // Handle the rejection - triggers untrackRejection
      // Original (&&): typeof process === "object" true, typeof "not a function" === "function" false → false → no runAfter
      // Mutated (||): typeof process === "object" true → true → runAfter runs → process.emit(...) → TypeError
      
      let uncaughtFired = false;
      process.once('uncaughtException', function(e) {
        uncaughtFired = true;
        Object.defineProperty(process, 'emit', {
          value: originalEmit,
          configurable: true,
          writable: true
        });
        // This should NOT happen with original code
        done(new Error("uncaughtException was thrown: " + e.message));
      });
      
      rejected.fail(function() { return "handled"; });
      
      // Give time for runAfter to execute
      setTimeout(function() {
        Object.defineProperty(process, 'emit', {
          value: originalEmit,
          configurable: true,
          writable: true
        });
        if (!uncaughtFired) {
          expect(unhandledRejectionReported).toBe(true);
          done();
        }
      }, 100);
    });
  });
});