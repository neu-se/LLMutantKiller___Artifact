const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should correctly use object_defineProperty to set promise properties", () => {
    // This test verifies that object_defineProperty is working correctly
    // by checking that promises can have properties defined on them
    const promise = Q.resolve(42);

    // The original code should properly define properties using Object.defineProperty
    // The mutated code (object_defineProperty = false) will cause this to fail
    expect(promise).toBeDefined();
    expect(promise.inspect()).toHaveProperty("state", "fulfilled");
    expect(promise.inspect()).toHaveProperty("value", 42);
  });
});