const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should correctly use object_defineProperty to set non-enumerable properties", () => {
    // Enable long stack traces which uses object_defineProperty
    Q.longStackSupport = true;

    const promise = Q.reject(new Error("test error"));

    // The original code should properly define the stack property as non-enumerable
    // The mutated code (object_defineProperty = false) will fail to set the property correctly
    expect(promise).toHaveProperty("stack");

    // Check that the property is actually set (not just inherited)
    expect(promise.propertyIsEnumerable("stack")).toBe(false);
  });
});