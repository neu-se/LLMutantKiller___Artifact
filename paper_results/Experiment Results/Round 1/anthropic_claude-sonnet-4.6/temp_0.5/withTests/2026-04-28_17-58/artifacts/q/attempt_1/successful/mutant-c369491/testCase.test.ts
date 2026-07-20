import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation through then", () => {
  it("should propagate progress notifications to listeners attached via then", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    const promise = deferred.promise.then(
      function onFulfilled() {
        expect(progressValues).toEqual([1, 2, 3]);
        done();
      },
      function onRejected() {
        done(new Error("Should not have been rejected"));
      },
      function onProgress(value: number) {
        progressValues.push(value);
      }
    );

    deferred.notify(1);
    deferred.notify(2);
    deferred.notify(3);
    deferred.resolve();
  });
});