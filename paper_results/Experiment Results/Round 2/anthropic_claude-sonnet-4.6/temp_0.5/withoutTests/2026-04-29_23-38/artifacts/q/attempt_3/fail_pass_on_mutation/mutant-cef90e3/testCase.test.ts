import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - progress callback", () => {
  it("should call the progress callback when notified", async () => {
    const deferred = Q.defer();
    const progressValues: any[] = [];

    deferred.promise.then(
      null,
      null,
      (value: any) => { progressValues.push(value); }
    );

    deferred.notify(1);
    deferred.notify(2);
    deferred.resolve(42);

    await deferred.promise;

    // Original: progressed(value) is called, progressValues = [1, 2]
    // Mutated: false ? progressed(value) : value - progressed never called
    expect(progressValues).toEqual([1, 2]);
  });
});