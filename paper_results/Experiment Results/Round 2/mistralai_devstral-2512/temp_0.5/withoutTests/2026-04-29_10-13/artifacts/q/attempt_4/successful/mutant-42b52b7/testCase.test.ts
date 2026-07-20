const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly handle unhandled rejections when process.emit exists", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Track if rejectionHandled event was emitted
    let rejectionHandledEmitted = false;

    // Override process.emit to track rejectionHandled events
    const originalEmit = process.emit;
    process.emit = function(event: string, ...args: any[]) {
      if (event === "rejectionHandled") {
        rejectionHandledEmitted = true;
      }
      return originalEmit.apply(process, [event, ...args]);
    };

    // Wait for unhandled rejection tracking to occur
    setTimeout(() => {
      // Now handle the rejection
      rejectedPromise.catch(() => {});

      // Wait for rejectionHandled event to be processed
      setTimeout(() => {
        // Restore original emit
        process.emit = originalEmit;

        // The test should pass if rejectionHandled was emitted
        expect(rejectionHandledEmitted).toBe(true);
        done();
      }, 50);
    }, 50);
  });
});