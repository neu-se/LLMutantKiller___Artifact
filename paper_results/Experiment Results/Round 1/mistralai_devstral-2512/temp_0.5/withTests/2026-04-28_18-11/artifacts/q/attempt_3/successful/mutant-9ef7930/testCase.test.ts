import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should correctly handle array with one promise", () => {
    const deferred = Q.defer();
    const promise = Q.race([deferred.promise]);

    setTimeout(() => {
      deferred.resolve("test");
    }, 10);

    return promise.then((result: unknown) => {
      expect(result).toBe("test");
    });
  });
});