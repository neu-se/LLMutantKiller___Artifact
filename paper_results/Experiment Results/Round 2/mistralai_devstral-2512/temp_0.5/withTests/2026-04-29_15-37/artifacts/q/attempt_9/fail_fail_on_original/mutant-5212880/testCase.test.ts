import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called", () => {
    const deferred = Q.defer();
    const result = Q.done(deferred.promise, () => {}, () => {}, () => {});
    // Check if result is a promise by verifying it has then() method
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
    expect(typeof result?.then).toBe("function");
    deferred.resolve(42);
  });
});