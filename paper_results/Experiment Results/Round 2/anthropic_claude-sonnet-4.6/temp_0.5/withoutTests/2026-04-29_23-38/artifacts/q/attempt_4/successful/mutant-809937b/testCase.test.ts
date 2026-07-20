import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit guard", () => {
  it("should not emit rejectionHandled when process.emit was not a function during untrackRejection", async () => {
    const originalEmit = process.emit;
    const emittedEvents: string[] = [];
    
    try {
      Q.resetUnhandledRejections();
      
      // Use a working spy for trackRejection phase
      (process as any).emit = function(event: string, ...args: any[]) {
        emittedEvents.push(event);
        return false;
      };
      
      const deferred = Q.defer();
      deferred.reject(new Error("test rejection"));
      
      // Wait for trackRejection's runAfter to fire and populate reportedUnhandledRejections
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Verify unhandledRejection was emitted (promise is now in reportedUnhandledRejections)
      expect(emittedEvents).toContain("unhandledRejection");
      
      // Now make process.emit NOT a function - this is what untrackRejection will see
      (process as any).emit = undefined;
      
      // Handle the rejection synchronously - untrackRejection is called here
      // Original: typeof undefined === "function" is false → runAfter NOT scheduled
      // Mutated: true → runAfter IS scheduled
      deferred.promise.catch(() => {});
      
      // Restore process.emit to spy BEFORE runAfter tasks run
      // (runAfter runs after nextTick queue, so a setTimeout(0) should be enough)
      await new Promise(resolve => setTimeout(resolve, 0));
      (process as any).emit = function(event: string, ...args: any[]) {
        emittedEvents.push(event);
        return false;
      };
      
      // Wait for runAfter tasks to execute
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const rejectionHandledEvents = emittedEvents.filter(e => e === "rejectionHandled");
      
      // Original: 0 rejectionHandled events (runAfter never scheduled)
      // Mutated: 1 rejectionHandled event (runAfter was scheduled and ran)
      expect(rejectionHandledEvents).toHaveLength(0);
    } finally {
      (process as any).emit = originalEmit;
    }
  });
});