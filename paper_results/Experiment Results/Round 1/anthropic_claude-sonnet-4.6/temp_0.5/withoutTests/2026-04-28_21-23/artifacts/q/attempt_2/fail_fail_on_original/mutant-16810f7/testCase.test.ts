import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection emits rejectionHandled", () => {
  it("should emit rejectionHandled process event when a reported rejection is handled", (done) => {
    Q.resetUnhandledRejections();
    
    const rejectionHandledEvents: any[] = [];
    let unhandledRejectionFired = false;
    
    const rejectionHandledHandler = (reason: any) => {
      rejectionHandledEvents.push(reason);
    };
    
    const unhandledRejectionHandler = (reason: any, promise: any) => {
      unhandledRejectionFired = true;
      // Now that it's been reported, handle the rejection
      promise.then(null, function() {});
      
      // Wait for rejectionHandled to fire
      setTimeout(() => {
        process.removeListener("rejectionHandled", rejectionHandledHandler);
        process.removeListener("unhandledRejection", unhandledRejectionHandler);
        expect(rejectionHandledEvents.length).toBeGreaterThan(0);
        done();
      }, 500);
    };
    
    process.on("rejectionHandled", rejectionHandledHandler);
    process.on("unhandledRejection", unhandledRejectionHandler);
    
    const reason = new Error("test rejection for emit");
    Q.reject(reason);
    
    // Fallback timeout in case unhandledRejection never fires
    setTimeout(() => {
      if (!unhandledRejectionFired) {
        process.removeListener("rejectionHandled", rejectionHandledHandler);
        process.removeListener("unhandledRejection", unhandledRejectionHandler);
        done.fail("unhandledRejection was never emitted");
      }
    }, 3000);
  }, 10000);
});