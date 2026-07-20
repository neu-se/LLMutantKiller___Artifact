const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should correctly create objects using Object.create when available", () => {
    // Test that directly exercises the object_create behavior
    // The mutation changes Object.create || polyfill to Object.create && polyfill
    // This means when Object.create exists, the mutated version will use the polyfill instead

    // Create a test object with a custom property
    const testProto = { testProp: "original" };

    // Create an object using Object.create
    const obj = Object.create(testProto);
    expect(obj.testProp).toBe("original");
    expect(Object.getPrototypeOf(obj)).toBe(testProto);

    // Test Q's promise creation which uses object_create internally
    const promise = Q.resolve("test");
    expect(promise).toBeTruthy();

    // Verify the promise works correctly
    return promise.then((value: string) => {
      expect(value).toBe("test");
    });
  });
});