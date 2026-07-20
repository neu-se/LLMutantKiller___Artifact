const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should return a promise when called on a promise object", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutated version returns undefined instead of a promise
    const result = promise.ninvoke("then");

    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});