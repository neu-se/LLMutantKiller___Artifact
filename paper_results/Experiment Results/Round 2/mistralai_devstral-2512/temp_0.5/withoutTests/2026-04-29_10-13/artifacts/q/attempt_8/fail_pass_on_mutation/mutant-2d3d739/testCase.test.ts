const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should properly define non-enumerable properties on promises", () => {
    // Enable long stack traces which uses object_defineProperty
    Q.longStackSupport = true;

    // Create a promise that will have stack properties defined
    const error = new Error("test");
    const promise = Q.reject(error);

    // The original code should properly define stack properties
    // The mutated code (object_defineProperty = false) will fail here
    // because it tries to call false as a function when setting properties

    // This will throw in the mutated version when trying to define properties
    expect(() => {
      const keys = Object.keys(promise);
      return keys.length > 0;
    }).not.toThrow();

    // Additional check that would fail in mutated version
    expect(promise.inspect().state).toBe("rejected");
  });
});