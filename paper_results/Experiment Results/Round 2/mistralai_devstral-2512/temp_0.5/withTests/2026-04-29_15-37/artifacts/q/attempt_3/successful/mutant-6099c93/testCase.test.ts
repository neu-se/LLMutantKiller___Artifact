const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should emit 'rejectionHandled' event when a rejected promise is handled", (done) => {
    // Track rejectionHandled events
    let rejectionHandledEmitted = false;
    const originalEmit = process.emit;
    process.emit = function(event, ...args) {
      if (event === 'rejectionHandled') {
        rejectionHandledEmitted = true;
      }
      return originalEmit.apply(process, [event, ...args]);
    };

    const error = new Error("test error");
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track the promise rejection
    deferred.reject(error);

    // Handle the rejection after some time
    setTimeout(() => {
      promise.catch(() => {
        // After handling, check if the event was emitted
        setTimeout(() => {
          expect(rejectionHandledEmitted).toBe(true);
          process.emit = originalEmit;
          done();
        }, 100);
      });
    }, 50);
  });
});