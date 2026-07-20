import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("observers called even after throw", () => {
  it("should still call subsequent observers even when a prior observer throws", () => {
    return new Promise<void>((resolve, reject) => {
      const deferred = Q.defer();
      let secondObserverCalled = false;

      Q.when(deferred.promise, function () {
        throw new Error("intentional error");
      });

      Q.when(deferred.promise, function (value: number) {
        secondObserverCalled = true;
        try {
          expect(value).toEqual(10);
          expect(secondObserverCalled).toBe(true);
          resolve();
        } catch (e) {
          reject(e);
        }
      }, function () {
        reject(new Error("should not be called"));
      });

      deferred.resolve(10);
    });
  });
});