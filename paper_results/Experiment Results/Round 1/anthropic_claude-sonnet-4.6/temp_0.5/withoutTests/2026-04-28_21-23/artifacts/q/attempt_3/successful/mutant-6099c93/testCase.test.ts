import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled when a reported unhandled rejection is later handled", (done) => {
    const rejectionHandledEvents: any[] = [];

    const onRejectionHandled = (reason: any, promise: any) => {
      rejectionHandledEvents.push({ reason, promise });
    };

    process.on("rejectionHandled", onRejectionHandled);

    let unhandledFired = false;
    const onUnhandledRejection = (r: any) => {
      if (r && r.message === "test-mutation-rejection-6099c93") {
        unhandledFired = true;
      }
    };
    process.on("unhandledRejection", onUnhandledRejection);

    const reason = new Error("test-mutation-rejection-6099c93");
    const rejectedPromise = Q.reject(reason);

    // Wait long enough for unhandledRejection to be emitted via runAfter
    // then handle the rejection, then wait for rejectionHandled
    setTimeout(() => {
      // At this point unhandledRejection should have fired and
      // the promise should be in reportedUnhandledRejections
      // Now handle it to trigger untrackRejection
      rejectedPromise.then(null, () => { /* handled */ });

      // Wait for the runAfter tick that emits rejectionHandled
      setTimeout(() => {
        process.removeListener("unhandledRejection", onUnhandledRejection);
        process.removeListener("rejectionHandled", onRejectionHandled);

        try {
          expect(unhandledFired).toBe(true);
          expect(rejectionHandledEvents.length).toBeGreaterThan(0);
          done();
        } catch (e) {
          done(e);
        }
      }, 200);
    }, 200);
  }, 10000);
});