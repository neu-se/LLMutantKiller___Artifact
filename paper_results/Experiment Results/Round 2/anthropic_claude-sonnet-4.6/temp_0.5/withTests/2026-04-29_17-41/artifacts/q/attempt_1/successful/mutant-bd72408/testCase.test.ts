import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener registration on pending promise", () => {
  it("should call the progress listener when notify is called before the promise is resolved", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;
    let progressValue: unknown;

    deferred.promise.then(
      function onFulfilled() {
        try {
          expect(progressCalled).toBe(true);
          expect(progressValue).toBe(42);
          done();
        } catch (e) {
          done(e);
        }
      },
      function onRejected() {
        done(new Error("Promise was unexpectedly rejected"));
      },
      function onProgress(value: unknown) {
        progressCalled = true;
        progressValue = value;
      }
    );

    deferred.notify(42);
    deferred.resolve("done");
  });
});