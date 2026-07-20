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

    // Use setTimeout to ensure the runAfter tick in trackRejection has fired,
    // which adds the promise to reportedUnhandledRejections and emits unhandledRejection
    setTimeout(() => {
      // Now handle the rejection - this triggers untrackRejection
      rejectedPromise.fail(() => {});

      // Wait for the runAfter tick in untrackRejection to fire
      setTimeout(() => {
        process.removeListener("rejectionHandled", rejectionHandledListener);
        expect(rejectionHandledEvents.length).toBeGreaterThanOrEqual(1);
        done();
      }, 200);
    }, 200);
  }, 10000);
});