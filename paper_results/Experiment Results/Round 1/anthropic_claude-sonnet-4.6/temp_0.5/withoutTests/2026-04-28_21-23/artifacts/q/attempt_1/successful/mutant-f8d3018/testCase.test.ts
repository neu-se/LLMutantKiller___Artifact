import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress notification", () => {
  it("should call the progressed function when progress is notified", async () => {
    const progressValues: number[] = [];
    const deferred = Q.defer();

    const promise = deferred.promise.then(
      (value) => value,
      null,
      (progress: number) => {
        return progress * 2;
      }
    );

    // Collect progress values from the chained promise
    const collectedProgress: number[] = [];
    promise.progress((value: number) => {
      collectedProgress.push(value);
    });

    deferred.notify(5);
    deferred.resolve(42);

    await promise;

    // With original code: progressed function is called, so progress value is transformed (5 * 2 = 10)
    // With mutated code: `false ? progressed(value) : value` means progressed function is never called,
    // so progress value passes through unchanged (5)
    expect(collectedProgress).toContain(10);
    expect(collectedProgress).not.toContain(5);
  });
});