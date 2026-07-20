import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit rejectionHandled event when a rejected promise is handled", (done) => {
    // Store original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to track calls
    let emitCalled = false;
    process.emit = function(event: string, ...args: any[]) {
      if (event === "rejectionHandled") {
        emitCalled = true;
      }
      return (originalEmit as Function).apply(this, [event, ...args]);
    };

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise
    deferred.reject(new Error("test error"));

    // Handle the rejection after a delay
    setTimeout(() => {
      promise.catch(() => {
        // Wait for the next tick to allow the event to be emitted
        setTimeout(() => {
          expect(emitCalled).toBe(true);
          // Restore original process.emit
          process.emit = originalEmit;
          done();
        }, 10);
      });
    }, 10);
  });
});