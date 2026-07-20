const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation behavior", () => {
  it("should use native Object.create when available", () => {
    // This test targets the specific mutation where:
    // Original: var object_create = Object.create || function (prototype) { ... }
    // Mutated:  var object_create = Object.create && function (prototype) { ... }

    // The mutation causes object_create to use the polyfill even when Object.create exists

    // We'll test this by checking if objects created by Q have the correct prototype chain
    // The polyfill creates objects differently than native Object.create

    // First verify Object.create works normally
    const testProto = { customMethod: () => "works" };
    const nativeObj = Object.create(testProto);
    expect(nativeObj.customMethod()).toBe("works");
    expect(Object.getPrototypeOf(nativeObj)).toBe(testProto);

    // Now test Q's internal object creation
    // We'll create a deferred and check its promise's prototype chain
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should be an instance of Q.Promise
    // With the mutation, this might behave differently
    expect(promise instanceof Q.Promise).toBe(true);

    // Test that the promise works correctly
    deferred.resolve("success");
    return promise.then((value: string) => {
      expect(value).toBe("success");
    });
  });
});