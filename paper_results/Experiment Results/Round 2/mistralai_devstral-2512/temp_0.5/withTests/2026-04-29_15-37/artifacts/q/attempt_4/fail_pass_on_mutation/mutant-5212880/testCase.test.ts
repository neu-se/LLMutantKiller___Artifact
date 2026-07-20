import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called", () => {
    const deferred = Q.defer();
    const result = Q.done(deferred.promise);
    expect(result).toBeUndefined();
    deferred.resolve(42);
  });
});