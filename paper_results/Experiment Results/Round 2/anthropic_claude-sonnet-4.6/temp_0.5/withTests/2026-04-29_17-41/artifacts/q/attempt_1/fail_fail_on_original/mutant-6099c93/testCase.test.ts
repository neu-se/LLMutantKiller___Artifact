import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled when a previously reported unhandled rejection gets handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection for rejectionHandled");
    const rejectedPromise = Q.reject(reason);

    const unhandledRejections: any[] = [];
    const handledRejections: any[] = [];

    const onUnhandledRejection = (r: any, p: any) => {
      unhandledRejections.push({ reason: r, promise: p });
    };

    const onRejectionHandled = (r: any, p: any) => {
      handledRejections.push({ reason: r, promise: p });
    };

    process.on("unhandledRejection", onUnhandledRejection);
    process.on("rejectionHandled", onRejectionHandled);

    // Wait for the unhandledRejection to be emitted first
    Q.nextTick.runAfter(function () {
      Q.nextTick.runAfter(function () {
        // Now handle the rejection - this should trigger rejectionHandled
        rejectedPromise.fail(function () {
          // handled
        });

        // Wait for the rejectionHandled event to be emitted
        Q.nextTick.runAfter(function () {
          Q.nextTick.runAfter(function () {
            process.removeListener("unhandledRejection", onUnhandledRejection);
            process.removeListener("rejectionHandled", onRejectionHandled);

            try {
              // The unhandledRejection should have been emitted
              expect(unhandledRejections.length).toBeGreaterThanOrEqual(1);
              // The rejectionHandled should have been emitted (original code)
              // In mutated code, this will be 0 because `if (false)` prevents the emit
              expect(handledRejections.length).toBeGreaterThanOrEqual(1);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
});