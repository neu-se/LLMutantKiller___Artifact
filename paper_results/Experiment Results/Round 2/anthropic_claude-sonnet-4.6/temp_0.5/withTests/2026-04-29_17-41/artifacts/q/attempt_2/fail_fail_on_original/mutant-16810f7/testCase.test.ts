import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("emits rejectionHandled on process when a reported unhandled rejection is later handled", (done) => {
    Q.resetUnhandledRejections();

    const rejectedPromise = Q.reject(new Error("test unhandled rejection"));
    const rejectionHandledEvents: any[] = [];

    const rejectionHandledListener = (reason: any) => {
      rejectionHandledEvents.push(reason);
    };

    process.on("rejectionHandled", rejectionHandledListener);

    // Wait for unhandledRejection to be reported first
    process.once("unhandledRejection", (_reason: any, promise: any) => {
      if (promise !== rejectedPromise) return;

      // Now handle the rejection after it has been reported
      rejectedPromise.fail(() => {});

      // Give time for the rejectionHandled runAfter tick to fire
      setTimeout(() => {
        process.removeListener("rejectionHandled", rejectionHandledListener);
        expect(rejectionHandledEvents.length).toBeGreaterThanOrEqual(1);
        done();
      }, 500);
    });
  }, 10000);
});