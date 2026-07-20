import { Q } from "../q.js";

describe("Q", () => {
  it("should resolve promises correctly", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: any) => {
      expect(value).toBe("test");
      done();
    });

    deferred.resolve("test");
  });

  it("should not resolve promises when resolve is not called", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let resolved = false;

    promise.then((value: any) => {
      resolved = true;
    });

    setTimeout(() => {
      expect(resolved).toBe(false);
      done();
    }, 100);
  });
});