import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should emit rejectionHandled when a previously reported unhandled rejection is later handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection reason");
    let rejectionHandledEmitted = false;

    const onRejectionHandled = (_reason: any, _promise: any) => {
      rejectionHandledEmitted = true;
    };

    process.on("rejectionHandled", onRejectionHandled);

    // Step 1: Create unhandled rejection
    const rejected = Q.reject(reason);

    // Step 2: Wait for unhandledRejection to be emitted AND added to reportedUnhandledRejections
    // This requires two runAfter cycles: one for the nextTick.runAfter in trackRejection
    const onUnhandledRejection = (_r: any, p: any) => {
      if (p === rejected) {
        process.removeListener("unhandledRejection", onUnhandledRejection);

        // Now the promise is in reportedUnhandledRejections
        // Handle the rejection - this should trigger rejectionHandled
        rejected.fail(function () {});

        // Wait for the runAfter callback in untrackRejection to fire
        setTimeout(() => {
          process.removeListener("rejectionHandled", onRejectionHandled);
          try {
            expect(rejectionHandledEmitted).toBe(true);
            done();
          } catch (e) {
            done(e);
          }
        }, 200);
      }
    };

    process.on("unhandledRejection", onUnhandledRejection);
  });
});