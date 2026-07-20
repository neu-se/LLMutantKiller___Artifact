import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should emit 'rejectionHandled' event when a rejected promise is handled", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track the rejection
    let rejectionHandledEmitted = false;
    const originalEmit = process.emit;
    process.emit = function(event: string, ...args: any[]) {
      if (event === "rejectionHandled") {
        rejectionHandledEmitted = true;
      }
      return originalEmit.call(process, event, ...args) as boolean;
    };

    // Handle the rejection after a delay to ensure tracking occurs
    setTimeout(() => {
      rejectedPromise.catch(() => {
        // Give time for the event to be emitted
        setTimeout(() => {
          process.emit = originalEmit;
          expect(rejectionHandledEmitted).toBe(true);
          done();
        }, 10);
      });
    }, 10);
  });
});