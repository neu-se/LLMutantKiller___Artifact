const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should correctly use Object.create when available", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    // Create a test prototype
    const testProto = { testProp: "testValue" };

    // Test that Object.create works correctly
    const obj1 = Object.create(testProto);
    expect(obj1.testProp).toBe("testValue");
    expect(Object.getPrototypeOf(obj1)).toBe(testProto);

    // Now test Q's behavior with a fresh environment
    // We need to test the internal object_create function indirectly
    // by checking if Q can create promises properly
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should be created with proper prototype chain
    expect(typeof promise.then).toBe("function");
    expect(typeof promise.inspect).toBe("function");

    // Test that the promise works correctly
    deferred.resolve(42);
    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});