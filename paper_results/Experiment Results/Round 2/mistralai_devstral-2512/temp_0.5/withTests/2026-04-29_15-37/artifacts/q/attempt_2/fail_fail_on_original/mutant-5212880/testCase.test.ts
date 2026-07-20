import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called with callbacks", () => {
    const deferred = Q.defer();
    const result = Q.done(deferred.promise, () => {}, () => {});
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
    deferred.resolve(42);
  });
});