import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should emit rejectionHandled process event when a reported unhandled rejection gets handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test unhandled rejection");
    let unhandledEmitted = false;
    let rejectionHandledEmitted = false;

    const onUnhandledRejection = (r: any, p: any) => {
      if (r === reason) {
        unhandledEmitted = true;
        // Now handle the rejection after it has been reported
        p.fail(function () {
          // handled
        });

        // Give time for rejectionHandled to be emitted
        setTimeout(() => {
          process.removeListener("unhandledRejection", onUnhandledRejection);
          process.removeListener("rejectionHandled", onRejectionHandled);

          try {
            expect(unhandledEmitted).toBe(true);
            // In original code: rejectionHandled IS emitted
            // In mutated code: rejectionHandled is NOT emitted (if (false) prevents it)
            expect(rejectionHandledEmitted).toBe(true);
            done();
          } catch (e) {
            done(e);
          }
        }, 100);
      }
    };

    const onRejectionHandled = (r: any, p: any) => {
      if (r === reason.stack) {
        rejectionHandledEmitted = true;
      }
    };

    process.on("unhandledRejection", onUnhandledRejection);
    process.on("rejectionHandled", onRejectionHandled);

    // Create a rejected promise that is not immediately handled
    Q.reject(reason);
  });
});