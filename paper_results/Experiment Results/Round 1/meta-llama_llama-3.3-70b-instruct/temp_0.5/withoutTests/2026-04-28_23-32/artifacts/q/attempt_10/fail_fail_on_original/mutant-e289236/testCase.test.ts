import { Q } from "./q.js";

describe("Q", () => {
  it("should resolve promises correctly", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: string) => {
      expect(value).toBe("test");
      done();
    });

    deferred.resolve("test");
  });

  it("should handle messages correctly", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let resolved = false;

    promise.then((value: string) => {
      resolved = true;
    });

    setTimeout(() => {
      expect(resolved).toBe(false);
      done();
    }, 100);
  });
});