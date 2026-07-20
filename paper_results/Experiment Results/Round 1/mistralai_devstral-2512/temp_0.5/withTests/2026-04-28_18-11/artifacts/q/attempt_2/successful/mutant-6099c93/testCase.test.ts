// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-6099c93/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should emit 'rejectionHandled' event when a previously unhandled rejection is handled", (done) => {
    // Create a rejection that will initially be unhandled
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track if rejectionHandled event was emitted
    let rejectionHandledEmitted = false;
    const originalEmit = process.emit;
    process.emit = function(event, ...args) {
      if (event === 'rejectionHandled') {
        rejectionHandledEmitted = true;
      }
      return originalEmit.apply(process, [event, ...args]);
    };

    // Let the rejection become unhandled
    Q.nextTick(() => {
      deferred.reject(new Error("test error"));

      // After a brief delay, handle the rejection
      setTimeout(() => {
        promise.catch(() => {
          // Give time for the event to be processed
          setTimeout(() => {
            // Restore original emit
            process.emit = originalEmit;

            // In the original code, the event should have been emitted
            // In the mutated code, it won't be emitted
            if (!rejectionHandledEmitted) {
              done(new Error("rejectionHandled event was not emitted"));
            } else {
              done();
            }
          }, 50);
        });
      }, 10);
    });
  });
});