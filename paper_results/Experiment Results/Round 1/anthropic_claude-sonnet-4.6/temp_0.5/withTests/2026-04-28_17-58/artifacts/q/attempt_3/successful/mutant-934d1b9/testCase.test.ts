import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer notify", () => {
  it("should not call progress listeners after the deferred has been resolved", (done) => {
    const deferred = Q.defer();
    let progressCallCount = 0;

    Q.when(
      deferred.promise,
      () => {
        // After fulfillment, notify should be a no-op
        deferred.notify("late progress");
        // Give time for any erroneous progress calls to fire
        setTimeout(() => {
          expect(progressCallCount).toBe(0);
          done();
        }, 50);
      },
      null,
      () => {
        progressCallCount++;
      }
    );

    deferred.resolve("done");
  });
});