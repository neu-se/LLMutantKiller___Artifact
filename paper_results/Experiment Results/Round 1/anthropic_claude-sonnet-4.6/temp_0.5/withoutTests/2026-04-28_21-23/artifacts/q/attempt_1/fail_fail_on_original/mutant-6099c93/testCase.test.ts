import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled event when a previously reported unhandled rejection is handled", (done) => {
    const rejectionHandledEvents: any[] = [];
    
    const onRejectionHandled = (reason: any, promise: any) => {
      rejectionHandledEvents.push({ reason, promise });
    };
    
    process.on("rejectionHandled", onRejectionHandled);
    
    // Create a rejected Q promise - this should trigger unhandledRejection tracking
    const reason = new Error("test rejection for rejectionHandled");
    const rejectedPromise = Q.reject(reason);
    
    // After the unhandledRejection is reported, handle it to trigger untrackRejection
    // The unhandledRejection event fires after a tick, then we handle it
    let unhandledFired = false;
    
    const onUnhandledRejection = (r: any, p: any) => {
      if (r === reason) {
        unhandledFired = true;
        // Now handle the rejection - this should trigger rejectionHandled
        rejectedPromise.then(null, () => {
          // handled the rejection
        });
        
        // Check after another tick that rejectionHandled was emitted
        Q.nextTick(function() {
          Q.nextTick(function() {
            process.removeListener("unhandledRejection", onUnhandledRejection);
            process.removeListener("rejectionHandled", onRejectionHandled);
            
            try {
              expect(unhandledFired).toBe(true);
              expect(rejectionHandledEvents.length).toBeGreaterThan(0);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      }
    };
    
    process.on("unhandledRejection", onUnhandledRejection);
    
    // Safety timeout cleanup
    setTimeout(() => {
      process.removeListener("unhandledRejection", onUnhandledRejection);
      process.removeListener("rejectionHandled", onRejectionHandled);
      if (!unhandledFired) {
        done(new Error("unhandledRejection was never fired"));
      }
    }, 2000);
  });
});