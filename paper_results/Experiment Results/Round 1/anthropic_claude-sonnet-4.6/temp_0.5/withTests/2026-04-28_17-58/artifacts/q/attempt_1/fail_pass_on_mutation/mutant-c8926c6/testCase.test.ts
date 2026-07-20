import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic resolution", () => {
  it("should resolve a deferred promise with the correct value", () => {
    return new Promise<void>((resolve, reject) => {
      const deferred = Q.defer();
      deferred.resolve(42);
      deferred.promise.then(
        (value: number) => {
          try {
            expect(value).toBe(42);
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        (err: unknown) => {
          reject(err);
        }
      );
    });
  });
});