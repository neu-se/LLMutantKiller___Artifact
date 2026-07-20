import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called", () => {
    const deferred = Q.defer();
    const result = Q.done(deferred.promise);
    // The original code returns a promise, mutated code returns undefined
    if (result !== undefined) {
      expect(typeof result.then).toBe("function");
      expect(result).toBeInstanceOf(Q.makePromise);
    } else {
      fail("Q.done should return a promise");
    }
    deferred.resolve(42);
  });
});