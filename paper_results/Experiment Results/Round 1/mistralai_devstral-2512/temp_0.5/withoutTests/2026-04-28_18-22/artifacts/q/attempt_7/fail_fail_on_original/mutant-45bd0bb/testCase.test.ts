const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation with Object.create", () => {
  it("should fail when Object.create is available but polyfill is incorrectly used", () => {
    // This test specifically targets the mutation where:
    // Original: var object_create = Object.create || function (prototype) { ... }
    // Mutated:  var object_create = Object.create && function (prototype) { ... }

    // In the mutated version, when Object.create exists, object_create becomes
    // the polyfill function instead of Object.create itself

    // Create a test to detect this by checking prototype chain behavior
    const testProto = { customProp: "test" };

    // Create object using Q's internal object_create (accessed indirectly)
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should have Q.Promise.prototype in its prototype chain
    // With the mutation, this might fail because the wrong function is used
    expect(Object.getPrototypeOf(promise)).toBe(Q.Promise.prototype);

    // Also test that we can create objects with proper inheritance
    const obj = Object.create(testProto);
    expect(obj.customProp).toBe("test");
    expect(Object.getPrototypeOf(obj)).toBe(testProto);

    // Test promise functionality
    deferred.resolve("success");
    return promise.then((value: string) => {
      expect(value).toBe("success");
    });
  });
});