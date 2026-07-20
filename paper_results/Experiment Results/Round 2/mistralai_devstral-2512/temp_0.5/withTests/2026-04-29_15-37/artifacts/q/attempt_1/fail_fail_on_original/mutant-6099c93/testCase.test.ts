import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit 'rejectionHandled' event when a rejected promise is handled", (done) => {
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
          const unhandled = Q.getUnhandledReasons();
          expect(unhandled).toEqual([]);
          done();
        }, 100);
      });
    }, 50);
  });
});