import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should stop progress propagation when listener throws", async () => {
    const deferred = Q.defer();
    let progressCount = 0;

    const promise = deferred.promise.then(
      () => {
        expect(progressCount).toBe(1);
      },
      () => {
        expect(true).toBe(false);
      },
      () => {
        progressCount++;
        if (progressCount === 1) {
          throw new Error("Progress error");
        }
      }
    );

    deferred.notify("first");
    deferred.notify("second");
    deferred.resolve();

    await promise;
    expect(progressCount).toBe(1);
  });
});