import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit behavior", () => {
  it("emits rejectionHandled event when a previously reported unhandled rejection is handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection for emit check");
    const rejectedPromise = Q.reject(reason);

    const handledPromises: any[] = [];
    const handler = (handledReason: any, promise: any) => {
      handledPromises.push({ handledReason, promise });
    };

    process.on("rejectionHandled", handler);

    // First, let the unhandledRejection event fire (runAfter tick)
    // Then handle the rejection
    Q.nextTick(() => {
      // At this point, the unhandledRejection runAfter should have fired
      // Now handle the rejection by chaining off it
      rejectedPromise.fail(() => {
        // handled
      });

      // Give time for the rejectionHandled runAfter to fire
      Q.nextTick(() => {
        Q.nextTick(() => {
          process.removeListener("rejectionHandled", handler);
          expect(handledPromises.length).toBe(1);
          done();
        });
      });
    });
  });
});