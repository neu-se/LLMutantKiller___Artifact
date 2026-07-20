import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener registration on pending promise", () => {
  it("should call a progress listener registered before the promise is resolved", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise.then(
      function onFulfilled() {
        expect(progressValues).toEqual([42]);
        done();
      },
      function onRejected() {
        done(new Error("Should not be rejected"));
      },
      function onProgress(value: number) {
        progressValues.push(value);
      }
    );

    deferred.notify(42);
    deferred.resolve(undefined);
  });
});