import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should resolve promises correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    deferred.resolve("test");

    promise.then((value) => {
      expect(value).toBe("test");
    });
  });

  it("should not resolve promises when resolve is not called", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value) => {
      expect(value).toBeUndefined();
      done();
    });

    setTimeout(() => {
      done();
    }, 100);
  });
});