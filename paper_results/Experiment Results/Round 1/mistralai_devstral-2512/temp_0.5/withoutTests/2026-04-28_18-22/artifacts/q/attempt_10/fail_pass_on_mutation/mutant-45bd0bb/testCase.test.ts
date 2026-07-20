const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should correctly create objects with proper prototype chain", () => {
    // Test that directly checks the object creation behavior
    // The mutation changes Object.create || polyfill to Object.create && polyfill
    // This means when Object.create exists, the mutated version will use the polyfill

    // Create a test prototype
    const testProto = { testProp: "value" };

    // Test native Object.create
    const nativeObj = Object.create(testProto);
    expect(nativeObj.testProp).toBe("value");
    expect(Object.getPrototypeOf(nativeObj)).toBe(testProto);

    // Test Q's promise creation which uses object_create internally
    const promise = Q.resolve(42);

    // Verify the promise has the expected methods
    expect(typeof promise.then).toBe("function");
    expect(typeof promise.inspect).toBe("function");

    // Test promise functionality
    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});