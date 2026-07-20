import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled event when a reported unhandled rejection is later handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection for rejectionHandled");
    let rejectionHandledEmitted = false;
    let unhandledRejectionPromise: any = null;

    const onUnhandledRejection = (err: any, promise: any) => {
      unhandledRejectionPromise = promise;
    };

    const onRejectionHandled = (stack: any, promise: any) => {
      if (promise === unhandledRejectionPromise) {
        rejectionHandledEmitted = true;
      }
    };

    process.on("unhandledRejection", onUnhandledRejection);
    process.on("rejectionHandled", onRejectionHandled);

    // Create a rejected promise - this will be tracked as unhandled
    const rejection = Q.reject(reason);

    // Wait for the unhandledRejection event to fire (which adds to reportedUnhandledRejections)
    // then handle the rejection to trigger untrackRejection
    setTimeout(() => {
      // Now handle the rejection - this should trigger untrackRejection
      // and emit rejectionHandled since it was already reported
      rejection.fail(() => {
        // handled
      });

      // Wait for rejectionHandled to be emitted
      setTimeout(() => {
        process.removeListener("unhandledRejection", onUnhandledRejection);
        process.removeListener("rejectionHandled", onRejectionHandled);

        expect(rejectionHandledEmitted).toBe(true);
        Q.resetUnhandledRejections();
        done();
      }, 200);
    }, 200);
  });
});