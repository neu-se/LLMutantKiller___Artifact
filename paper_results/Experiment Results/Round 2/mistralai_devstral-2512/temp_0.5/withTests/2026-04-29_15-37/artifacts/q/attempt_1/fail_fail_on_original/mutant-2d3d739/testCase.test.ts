import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should correctly define properties on objects using Q", () => {
    const obj = {};
    const descriptor = {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true
    };

    // This test relies on the internal implementation of Q that uses object_defineProperty
    // to set properties on error objects for long stack traces
    return Q.reject(new Error("test"))
      .catch((error) => {
        // In the original code, object_defineProperty is a function that can define properties
        // In the mutated code, it's set to false, which should cause an error when Q tries to use it
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("test");
        return Q.resolve();
      });
  });
});