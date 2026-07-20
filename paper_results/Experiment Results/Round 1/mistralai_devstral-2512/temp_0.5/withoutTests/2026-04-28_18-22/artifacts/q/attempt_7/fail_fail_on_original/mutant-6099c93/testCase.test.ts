const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit rejectionHandled event with correct parameters", (done) => {
    // Track rejectionHandled events
    let rejectionHandledCalled = false;
    const originalEmit = process.emit;
    process.emit = function(event: string, reason: any, promise: any) {
      if (event === "rejectionHandled") {
        rejectionHandledCalled = true;
        // Verify the reason contains our error message
        expect(typeof reason).toBe("string");
        expect(reason).toContain("test error");
        // Verify the promise is actually rejected
        expect(Q.isRejected(promise)).toBe(true);
      }
      return (originalEmit as any).call(this, event, reason, promise);
    };

    // Create a rejected promise
    const rejectedPromise = Q.reject("test error");

    // Wait for unhandled rejection tracking
    setTimeout(() => {
      // Handle the rejection
      rejectedPromise.catch(() => {
        // Wait for rejectionHandled event
        setTimeout(() => {
          process.emit = originalEmit;
          expect(rejectionHandledCalled).toBe(true);
          done();
        }, 50);
      });
    }, 50);
  });
});