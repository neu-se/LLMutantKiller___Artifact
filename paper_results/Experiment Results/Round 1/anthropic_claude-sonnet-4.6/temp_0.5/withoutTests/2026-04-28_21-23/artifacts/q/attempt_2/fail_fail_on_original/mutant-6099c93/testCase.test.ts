import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled when a reported unhandled rejection is later handled", (done) => {
    const rejectionHandledPromises: any[] = [];

    const onRejectionHandled = (_reason: any, promise: any) => {
      rejectionHandledPromises.push(promise);
    };

    process.on("rejectionHandled", onRejectionHandled);

    const reason = new Error("unhandled rejection test");
    const rejectedPromise = Q.reject(reason);

    // Wait for unhandledRejection to be emitted (happens after Q.nextTick.runAfter)
    const onUnhandledRejection = (r: any) => {
      if (r !== reason) return;

      process.removeListener("unhandledRejection", onUnhandledRejection);

      // Now handle the rejection - this calls untrackRejection
      // which should emit rejectionHandled since it was already reported
      rejectedPromise.then(null, () => { /* handled */ });

      // Wait for the runAfter tick that emits rejectionHandled
      setTimeout(() => {
        process.removeListener("rejectionHandled", onRejectionHandled);

        try {
          expect(rejectionHandledPromises.length).toBe(1);
          done();
        } catch (e) {
          done(e);
        }
      }, 500);
    };

    process.on("unhandledRejection", onUnhandledRejection);

    // Cleanup in case unhandledRejection never fires
    setTimeout(() => {
      process.removeListener("unhandledRejection", onUnhandledRejection);
      process.removeListener("rejectionHandled", onRejectionHandled);
      done(new Error("unhandledRejection was never fired"));
    }, 3000);
  }, 10000);
});