import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any progress notification", () => {
  it("should forward progress notifications from promises passed to Q.any", (done) => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const progressValues: Array<{ index: number; value: any }> = [];

    Q.any([deferred1.promise, deferred2.promise])
      .then(
        () => {
          // fulfilled - test passes if we got progress notifications
          expect(progressValues.length).toBeGreaterThan(0);
          expect(progressValues[0]).toEqual({ index: 0, value: 42 });
          done();
        },
        (err: any) => {
          done(err);
        },
        (progress: any) => {
          progressValues.push(progress);
        }
      );

    // Send a progress notification from deferred1
    deferred1.notify(42);

    // Then resolve deferred1 to fulfill the any promise
    deferred1.resolve("done");
  });
});