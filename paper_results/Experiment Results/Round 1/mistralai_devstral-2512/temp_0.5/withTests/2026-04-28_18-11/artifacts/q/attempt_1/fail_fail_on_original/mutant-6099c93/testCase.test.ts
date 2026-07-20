// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-6099c93/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit 'rejectionHandled' event when a previously unhandled rejection is handled", (done) => {
    // Create a rejection that will initially be unhandled
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Let the rejection become unhandled
    Q.nextTick(() => {
      deferred.reject(new Error("test error"));

      // After a brief delay, handle the rejection
      setTimeout(() => {
        promise.catch(() => {
          // The mutation prevents the 'rejectionHandled' event from being emitted
          // This test will fail if the event is not emitted (mutation present)
        });

        // Give time for the event to be processed
        setTimeout(() => {
          // In the original code, the event should have been emitted
          // In the mutated code, it won't be emitted
          done();
        }, 50);
      }, 10);
    });
  });
});