const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should fail when object_defineProperty is not functional", () => {
    // Enable long stack traces which requires object_defineProperty
    Q.longStackSupport = true;

    // Create a deferred promise which uses object_defineProperty internally
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The original code should work fine
    // The mutated code (object_defineProperty = false) will fail when trying to define properties

    // This will throw in the mutated version when trying to define stack properties
    expect(() => {
      deferred.reject(new Error("test"));
    }).not.toThrow();

    // Return the promise to ensure proper async handling
    return promise.then(
      () => {},
      () => {}
    );
  });
});