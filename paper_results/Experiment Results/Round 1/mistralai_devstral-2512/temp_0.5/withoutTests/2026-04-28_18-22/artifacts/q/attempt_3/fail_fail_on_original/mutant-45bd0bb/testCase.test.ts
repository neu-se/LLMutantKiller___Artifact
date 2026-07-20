const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should correctly create objects using object_create polyfill", () => {
    // Test that Object.create works correctly when it's available
    const testProto = { testProp: "testValue" };
    const obj = Object.create(testProto);
    expect(obj.testProp).toBe("testValue");

    // Test that Q can create promises (which internally uses object_create)
    const promise = Q.resolve(42);
    expect(promise).toBeInstanceOf(Q.Promise);

    // Verify the promise behaves correctly
    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});