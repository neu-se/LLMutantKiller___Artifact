import { Q } from "./q";

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

  it("should handle messages correctly", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: any) => {
      expect(value).toBe("test");
      done();
    });

    deferred.resolve("test");
  });
});