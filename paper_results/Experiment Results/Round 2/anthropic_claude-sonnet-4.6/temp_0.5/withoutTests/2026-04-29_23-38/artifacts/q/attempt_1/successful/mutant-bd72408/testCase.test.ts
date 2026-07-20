import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener registration on pending promise", () => {
  it("should call progress listener when deferred.notify is called on a pending promise", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise.then(
      null,
      null,
      function (value: number) {
        progressValues.push(value);
      }
    );

    // Notify with a progress value
    deferred.notify(42);

    // Use nextTick to allow async processing to complete
    Q.nextTick(function () {
      Q.nextTick(function () {
        try {
          expect(progressValues).toContain(42);
          // Resolve the deferred to clean up
          deferred.resolve("done");
          done();
        } catch (e) {
          deferred.resolve("done");
          done(e);
        }
      });
    });
  });
});