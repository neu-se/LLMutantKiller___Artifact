import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf behavior", () => {
  it("should return the resolved value when valueOf is called on a resolved deferred promise", () => {
    const deferred = Q.defer();
    const value = 42;
    deferred.resolve(value);

    // After resolving, valueOf should return the nearer (resolved) value,
    // not the promise itself
    const result = deferred.promise.valueOf();

    // In the original code, valueOf returns the nearerValue (42 for a fulfilled promise)
    // In the mutated code, valueOf returns undefined (empty function)
    expect(result).toBe(value);
  });
});