import { Q } from "./q.js";

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
    const messages: any[] = [];

    deferred.resolve("test");

    promise.then((value: any) => {
      expect(value).toBe("test");
      done();
    });
  });
});