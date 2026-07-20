import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should resolve promises correctly", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value) => {
      expect(value).toBe("test");
      done();
    });

    deferred.resolve("test");
  });

  it("should handle messages correctly", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let resolved = false;

    promise.then((value) => {
      resolved = true;
    });

    setTimeout(() => {
      expect(resolved).toBe(false);
      done();
    }, 100);
  });
});