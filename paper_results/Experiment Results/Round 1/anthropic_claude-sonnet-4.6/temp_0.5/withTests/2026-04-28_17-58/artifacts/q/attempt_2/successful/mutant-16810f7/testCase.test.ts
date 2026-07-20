import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit behavior", () => {
  it("emits rejectionHandled event when a tracked rejection gets handled", (done) => {
    Q.resetUnhandledRejections();

    const rejectionHandledEvents: Array<{ reason: any; promise: any }> = [];

    const handler = (reason: any, promise: any) => {
      rejectionHandledEvents.push({ reason, promise });
    };

    process.on("rejectionHandled", handler);

    // First, create a rejection and let it be tracked as unhandled
    const reason = new Error("unhandled rejection test");
    const rejectedPromise = Q.reject(reason);

    // Wait for the unhandledRejection tracking to fire (via runAfter)
    // then handle the rejection so untrackRejection is called
    setTimeout(() => {
      // Now handle it - this calls untrackRejection which should emit rejectionHandled
      rejectedPromise.fail(() => {});

      // Wait for the runAfter callback to fire
      setTimeout(() => {
        process.removeListener("rejectionHandled", handler);
        Q.resetUnhandledRejections();

        // In original: process.emit("rejectionHandled") is called because typeof process === "object"
        // In mutated: it is NOT called because typeof process === "" is false
        expect(rejectionHandledEvents.length).toBe(1);
        done();
      }, 200);
    }, 200);
  });
});