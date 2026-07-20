import { Q } from "./q.js";

describe("Q promise inspection", () => {
  it("should correctly identify rejected promise state", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // Force the promise to settle
    return Q.when(promise, null, (error) => {
      // The promise should be rejected, so valueOf should return the promise itself
      expect(promise.valueOf()).toBe(promise);
    });
  });
});