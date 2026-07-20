import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener registration on pending promise", () => {
  it("should call a progress listener registered via Q.when when deferred.notify is called", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    Q.when(
      deferred.promise,
      function () {
        expect(progressCalled).toBe(true);
        done();
      },
      function () {
        done(new Error("Should not reject"));
      },
      function () {
        progressCalled = true;
      }
    );

    deferred.notify();
    deferred.resolve();
  });
});