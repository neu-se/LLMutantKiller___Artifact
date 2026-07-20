import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection emits rejectionHandled event", () => {
  it("should emit rejectionHandled on process when a tracked rejection is handled", (done) => {
    const handledReasons: any[] = [];
    
    const handler = (reason: any, promise: any) => {
      handledReasons.push(reason);
    };
    
    process.on("rejectionHandled", handler);
    
    // First, create an unhandled rejection that gets tracked
    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);
    
    // Now handle it - this should trigger untrackRejection and emit rejectionHandled
    rejectedPromise.then(null, function() {
      // rejection handled
    });
    
    // Wait for async operations to complete
    setTimeout(() => {
      process.removeListener("rejectionHandled", handler);
      
      // In the original code, rejectionHandled should have been emitted
      // In the mutated code, it won't be emitted because typeof process === "" is false
      expect(handledReasons.length).toBeGreaterThan(0);
      done();
    }, 100);
  });
});