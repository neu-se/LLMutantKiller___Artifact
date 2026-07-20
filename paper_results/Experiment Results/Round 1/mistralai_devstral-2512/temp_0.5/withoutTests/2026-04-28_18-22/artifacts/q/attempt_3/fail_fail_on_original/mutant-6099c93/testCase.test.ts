const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit rejectionHandled event when a rejected promise is handled", (done) => {
    // Setup a listener for the rejectionHandled event
    const listener = jest.fn((reason, promise) => {
      expect(reason).toBe("test error");
      expect(Q.isRejected(promise)).toBe(true);
      done();
    });

    // Mock process.emit to capture the event
    const originalEmit = process.emit;
    process.emit = listener;

    try {
      // Create a rejected promise and let it become unhandled
      const rejectedPromise = Q.reject("test error");

      // Force the promise to be tracked as unhandled
      setTimeout(() => {
        // Now handle the rejection
        rejectedPromise.catch(() => {
          // The rejectionHandled event should be emitted
          setTimeout(() => {
            // Restore original emit
            process.emit = originalEmit;
          }, 10);
        });
      }, 10);
    } catch (error) {
      // Restore original emit in case of error
      process.emit = originalEmit;
      done(error);
    }
  });
});