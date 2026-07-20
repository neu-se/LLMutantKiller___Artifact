import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking - rejectionHandled event", () => {
  it("emits rejectionHandled on process when a previously unhandled rejection gets handled", (done) => {
    Q.resetUnhandledRejections();

    const rejectedReason = new Error("test rejection for rejectionHandled");
    const rejectedPromise = Q.reject(rejectedReason);

    // Give the unhandledRejection tracking a tick to register
    Q.nextTick(function () {
      const rejectionHandledEvents: any[] = [];

      const handler = (reason: any, promise: any) => {
        rejectionHandledEvents.push({ reason, promise });
      };

      process.on("rejectionHandled", handler);

      // Now handle the rejection - this should trigger untrackRejection
      // which in the original code emits "rejectionHandled"
      rejectedPromise.fail(function () {
        // handled
      });

      // Wait for the async operations to complete
      Q.nextTick(function () {
        Q.nextTick(function () {
          Q.nextTick(function () {
            process.removeListener("rejectionHandled", handler);
            // In the original code, rejectionHandled should have been emitted
            // In the mutated code, the typeof process === "" check fails, so it won't emit
            expect(rejectionHandledEvents.length).toBeGreaterThan(0);
            Q.resetUnhandledRejections();
            done();
          });
        });
      });
    });
  });
});