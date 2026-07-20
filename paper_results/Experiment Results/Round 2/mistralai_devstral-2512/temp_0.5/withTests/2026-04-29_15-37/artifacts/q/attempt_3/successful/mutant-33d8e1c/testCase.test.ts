import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress notification", () => {
  it("should call progress listeners with transformed values", () => {
    const deferred = Q.defer();
    const progressValues: number[] = [];
    const promise = deferred.promise.then(
      () => {
        expect(progressValues).toEqual([5]);
      },
      () => {
        expect(true).toBe(false);
      },
      (value: number) => {
        progressValues.push(value);
      }
    );

    deferred.notify(5);
    deferred.resolve();

    return promise;
  });
});