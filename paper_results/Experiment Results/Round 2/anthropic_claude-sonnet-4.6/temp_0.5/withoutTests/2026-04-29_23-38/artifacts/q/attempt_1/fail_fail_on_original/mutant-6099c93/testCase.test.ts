import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled event when a reported unhandled rejection is later handled", (done) => {
    // We need to:
    // 1. Create an unhandled rejection that gets reported via unhandledRejection event
    // 2. Then handle it
    // 3. Verify rejectionHandled is emitted

    const rejectionHandledEvents: Array<{ reason: any; promise: any }> = [];
    
    const rejectionHandledListener = (reason: any, promise: any) => {
      rejectionHandledEvents.push({ reason, promise });
    };

    process.on("rejectionHandled", rejectionHandledListener);

    // Create a rejected promise - this will trigger unhandledRejection tracking
    const reason = new Error("test rejection for mutation detection");
    const rejectedPromise = Q.reject(reason);

    // After the unhandledRejection event fires (meaning it's been added to reportedUnhandledRejections),
    // we handle the rejection which should trigger rejectionHandled
    const unhandledRejectionListener = (rej: any, promise: any) => {
      // Now handle the rejection - this should trigger rejectionHandled
      // via untrackRejection -> process.emit("rejectionHandled", ...)
      rejectedPromise.then(null, () => {
        // handled - now wait a tick for rejectionHandled to fire
        Q.nextTick(() => {
          Q.nextTick(() => {
            process.removeListener("rejectionHandled", rejectionHandledListener);
            process.removeListener("unhandledRejection", unhandledRejectionListener);
            
            try {
              expect(rejectionHandledEvents.length).toBeGreaterThan(0);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    };

    process.once("unhandledRejection", unhandledRejectionListener);
  });
});