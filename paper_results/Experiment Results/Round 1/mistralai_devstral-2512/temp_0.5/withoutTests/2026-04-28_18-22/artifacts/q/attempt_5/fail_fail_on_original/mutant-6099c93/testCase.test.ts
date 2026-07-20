const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit rejectionHandled event when handling previously unhandled rejection", (done) => {
    // Track rejectionHandled events
    let rejectionHandledEmitted = false;
    const originalEmit = process.emit;
    process.emit = function(event: string, ...args: any[]) {
      if (event === "rejectionHandled") {
        rejectionHandledEmitted = true;
        expect(args[0]).toContain("test error");
        expect(Q.isRejected(args[1])).toBe(true);
      }
      return (originalEmit as any).apply(this, [event, ...args]);
    };

    // Create and immediately reject a promise
    const rejectedPromise = Q.reject("test error");

    // Wait for unhandled rejection to be tracked
    setTimeout(() => {
      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Wait for rejectionHandled event to be emitted
        setTimeout(() => {
          process.emit = originalEmit;
          expect(rejectionHandledEmitted).toBe(true);
          done();
        }, 50);
      });
    }, 50);
  });
});