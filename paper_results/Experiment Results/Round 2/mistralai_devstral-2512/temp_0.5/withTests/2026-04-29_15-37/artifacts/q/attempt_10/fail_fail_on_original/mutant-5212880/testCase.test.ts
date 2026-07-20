import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise object", () => {
    const deferred = Q.defer();
    const result = Q.done(deferred.promise, () => {}, () => {}, () => {});
    // In original code, result should be a promise (truthy)
    // In mutated code, result will be undefined (falsy)
    expect(!!result).toBe(true);
    deferred.resolve(42);
  });
});