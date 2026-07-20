import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit guard", () => {
  it("guards process.emit call with typeof function check", async () => {
    const originalEmit = process.emit;
    const emitCallArgs: string[] = [];
    
    // Track calls to process.emit
    (process as any).emit = function(event: string) {
      emitCallArgs.push(event);
      return false;
    };
    
    try {
      // Create and immediately handle a rejection to trigger untrackRejection
      const deferred = Q.defer();
      deferred.reject(new Error("test"));
      await deferred.promise.catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Now set emit to non-function BEFORE creating the rejection
      (process as any).emit = undefined;
      
      // The runAfter task checks if the promise is in unhandledRejections.
      // In original: the runAfter is only scheduled if process.emit is a function
      // In mutated: the runAfter is always scheduled, and will try to call undefined()
      
      // We need to detect that the mutated code schedules a task that calls process.emit
      // Let's restore emit to a spy to see if it gets called
      const deferred2 = Q.defer();
      deferred2.reject(new Error("test2"));
      
      // Wait for unhandledRejection tracking to fire
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Now handle it - triggers untrackRejection
      // In original: won't schedule runAfter because process.emit is undefined (not a function)
      // In mutated: will schedule runAfter and try to call undefined()
      const callsBeforeHandle = emitCallArgs.length;
      
      // Restore to a spy to capture any calls
      (process as any).emit = function(event: string) {
        emitCallArgs.push(event);
        return false;
      };
      
      await deferred2.promise.catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // In original: the runAfter was never scheduled (emit wasn't a function when untrackRejection ran)
      // In mutated: runAfter was scheduled (condition was true), and now tries to call emit
      // But wait - the runAfter task calls process.emit at the time it runs, not when scheduled
      
      expect(emitCallArgs.filter(e => e === "rejectionHandled")).toHaveLength(0);
    } finally {
      (process as any).emit = originalEmit;
    }
  });
});