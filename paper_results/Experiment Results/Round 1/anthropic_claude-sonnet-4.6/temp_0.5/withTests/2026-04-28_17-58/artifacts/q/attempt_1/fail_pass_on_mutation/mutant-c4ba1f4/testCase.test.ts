import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("should resolve a deferred promise and invoke the fulfillment callback", () => {
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
          reject(new Error("Promise was rejected unexpectedly: " + err));
        }
      );
    });
  });
});