import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nearer function behavior", () => {
  it("should return the fulfillment value when valueOf is called on a resolved deferred promise", () => {
    const deferred = Q.defer();
    const value = { answer: 42 };
    deferred.resolve(value);

    // After resolving, valueOf should return the fulfillment value, not the promise
    // This relies on nearer() correctly returning inspected.value for fulfilled promises
    const result = deferred.promise.valueOf();
    expect(result).toBe(value);
  });
});