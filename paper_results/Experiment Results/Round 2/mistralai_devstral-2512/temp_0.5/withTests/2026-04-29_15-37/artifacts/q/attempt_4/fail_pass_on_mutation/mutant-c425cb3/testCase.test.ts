import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should continue progress propagation after listener throws", async () => {
    const deferred = Q.defer();
    let progressCount = 0;

    // Set up error handler to prevent test failure
    Q.onerror = () => {};

    const promise = deferred.promise.then(
      () => {
        expect(progressCount).toBe(2);
      },
      () => {
        expect(true).toBe(false);
      },
      () => {
        progressCount++;
        throw new Error("Progress error");
      }
    );

    deferred.notify("first");
    deferred.notify("second");
    deferred.resolve();

    await promise;
    expect(progressCount).toBe(2);
  });
});