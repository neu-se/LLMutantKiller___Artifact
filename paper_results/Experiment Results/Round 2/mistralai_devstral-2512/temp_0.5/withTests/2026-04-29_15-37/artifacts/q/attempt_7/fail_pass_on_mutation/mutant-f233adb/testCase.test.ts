// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library behavior", () => {
  it("should create valid promises when Q is properly initialized", () => {
    // Test basic promise functionality which depends on proper initialization
    const deferred = Q.defer();
    const promise = deferred.promise;

    expect(typeof promise.then).toBe('function');
    expect(typeof promise.catch).toBe('function');

    let resolvedValue: any;
    promise.then((value: any) => {
      resolvedValue = value;
    });

    deferred.resolve(42);
    return Q.delay(10).then(() => {
      expect(resolvedValue).toBe(42);
    });
  });
});