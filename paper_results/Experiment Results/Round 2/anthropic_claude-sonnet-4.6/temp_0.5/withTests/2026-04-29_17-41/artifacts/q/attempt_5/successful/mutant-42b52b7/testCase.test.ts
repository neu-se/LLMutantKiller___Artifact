import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("emits the rejectionHandled process event when a previously reported rejection is handled", (done) => {
    Q.resetUnhandledRejections();

    const rejectionHandledEvents: any[] = [];

    function onRejectionHandled(reason: any) {
      rejectionHandledEvents.push(reason);
    }

    process.on("rejectionHandled", onRejectionHandled);

    // Create a rejection - it gets tracked and reported via unhandledRejection
    const reason = new Error("test rejection for rejectionHandled");
    const rejected = Q.reject(reason);

    // Wait for the unhandledRejection to be reported first (via runAfter)
    // then handle the rejection so rejectionHandled gets emitted
    setTimeout(function() {
      // Handle the rejection - this triggers untrackRejection
      rejected.fail(function() { return "handled"; });

      // Wait for the rejectionHandled event to be emitted (via runAfter)
      setTimeout(function() {
        process.removeListener("rejectionHandled", onRejectionHandled);
        // Original: emits rejectionHandled because process.emit === "function" is true
        // Mutated: does NOT emit because process.emit !== "function" is false in Node.js
        expect(rejectionHandledEvents.length).toBe(1);
        done();
      }, 200);
    }, 200);
  });
});