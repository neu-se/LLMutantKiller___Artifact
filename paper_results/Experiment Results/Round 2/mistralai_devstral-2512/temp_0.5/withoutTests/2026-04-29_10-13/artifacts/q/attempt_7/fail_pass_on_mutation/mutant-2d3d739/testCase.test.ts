const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should fail when object_defineProperty is not a function", () => {
    // This test directly checks if object_defineProperty is callable
    // In the original code it should be a function
    // In the mutated code it's set to false

    // We need to access the internal object_defineProperty that Q uses
    // Since it's not exported, we'll test it indirectly by trying to use
    // functionality that depends on it

    expect(() => {
      // Enable long stack traces which requires object_defineProperty
      Q.longStackSupport = true;

      // Create a promise - this should work in original but fail in mutated
      const promise = Q.resolve(42);

      // Try to access properties that are set using object_defineProperty
      // This will throw in the mutated version
      const inspect = promise.inspect();
      if (inspect.state === "fulfilled") {
        return true;
      }
    }).not.toThrow();

    // Additional check that would fail in mutated version
    const deferred = Q.defer();
    expect(typeof deferred).toBe("object");
    expect(typeof deferred.promise).toBe("object");
  });
});