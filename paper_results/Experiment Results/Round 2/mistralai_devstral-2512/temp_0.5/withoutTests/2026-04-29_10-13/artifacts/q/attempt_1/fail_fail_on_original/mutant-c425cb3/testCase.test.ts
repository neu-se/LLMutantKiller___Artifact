import { Q } from "./q";

describe("Promise progress notification", () => {
  it("should notify progress listeners with the correct value", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise.then(
      () => {},
      () => {},
      (progress) => {
        progressValues.push(progress);
      }
    );

    deferred.notify(42);

    setTimeout(() => {
      expect(progressValues).toEqual([42]);
      done();
    }, 10);
  });
});