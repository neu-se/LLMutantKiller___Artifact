import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should emit rejectionHandled event when a previously unhandled rejection is later handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("unhandled then handled");
    let rejectionHandledEmitted = false;

    const originalEmit = process.emit.bind(process);
    (process as any).emit = function (event: string, ...args: any[]) {
      if (event === "rejectionHandled") {
        rejectionHandledEmitted = true;
      }
      if (event === "unhandledRejection") {
        // suppress to avoid noise, but allow processing
        return false;
      }
      return originalEmit(event, ...args);
    };

    // Create a rejection - this will be tracked as unhandled
    const rejected = Q.reject(reason);

    // Wait long enough for the unhandledRejection event to be emitted
    // (Q uses nextTick.runAfter which runs after the flush)
    setTimeout(() => {
      // Now handle the rejection - this should trigger rejectionHandled
      rejected.fail(function () {});

      // Wait for the rejectionHandled event to be emitted
      setTimeout(() => {
        (process as any).emit = originalEmit;
        expect(rejectionHandledEmitted).toBe(true);
        done();
      }, 100);
    }, 100);
  });
});