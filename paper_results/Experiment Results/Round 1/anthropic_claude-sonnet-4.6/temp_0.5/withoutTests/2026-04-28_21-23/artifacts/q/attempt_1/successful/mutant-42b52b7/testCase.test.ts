import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit behavior", () => {
  it("should emit rejectionHandled event when a rejected promise gets a handler", async () => {
    const rejectionHandledEvents: any[] = [];
    
    const handler = (reason: any, promise: any) => {
      rejectionHandledEvents.push({ reason, promise });
    };
    
    process.on("rejectionHandled", handler);
    
    try {
      const reason = new Error("test rejection");
      const rejected = Q.reject(reason);
      
      // Wait a tick to allow unhandledRejection tracking to fire
      await new Promise(resolve => Q.nextTick(resolve));
      
      // Now attach a handler - this should trigger untrackRejection
      // and emit "rejectionHandled"
      rejected.then(null, () => {});
      
      // Wait for the runAfter tasks to execute
      await new Promise(resolve => Q.nextTick(resolve));
      await new Promise(resolve => Q.nextTick(resolve));
      await new Promise(resolve => setImmediate(resolve));
      await new Promise(resolve => setImmediate(resolve));
      
      // In original code: rejectionHandled is emitted because process.emit IS a function
      // In mutated code: rejectionHandled is NOT emitted because process.emit is NOT "not a function"
      expect(rejectionHandledEvents.length).toBeGreaterThan(0);
    } finally {
      process.removeListener("rejectionHandled", handler);
    }
  });
});