import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should resolve a deferred promise asynchronously", () => {
    return new Promise<void>((resolve, reject) => {
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(
        (value: number) => {
          expect(value).toBe(42);
          expect(resolved).toBe(true);
          resolve();
        },
        (err: Error) => reject(err)
      );

      deferred.resolve(42);
      resolved = true;
    });
  });
});