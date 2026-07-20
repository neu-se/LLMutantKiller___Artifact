const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should correctly use object_defineProperty to define promise properties", () => {
    // Create a deferred promise which uses object_defineProperty internally
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the promise
    deferred.resolve(42);

    // The original code should properly define properties using Object.defineProperty
    // The mutated code (object_defineProperty = false) will cause this to fail
    // when trying to access properties that should have been defined

    return promise.then(value => {
      expect(value).toBe(42);

      // Try to access the promise's internal state
      // This will fail in the mutated version because object_defineProperty is false
      const inspectResult = promise.inspect();
      expect(inspectResult.state).toBe("fulfilled");
      expect(inspectResult.value).toBe(42);
    });
  });
});