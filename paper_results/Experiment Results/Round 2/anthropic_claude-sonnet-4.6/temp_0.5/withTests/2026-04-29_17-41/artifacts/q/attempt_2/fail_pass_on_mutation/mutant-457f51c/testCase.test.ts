import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("valueOf on a fulfilled promise should return the fulfillment value, not the promise itself", () => {
    const deferred = Q.defer();
    deferred.resolve(99);
    const p = deferred.promise;
    // After resolution, valueOf should return the nearer value (99), not the promise
    const val = p.valueOf();
    expect(val).toBe(99);
  });
});