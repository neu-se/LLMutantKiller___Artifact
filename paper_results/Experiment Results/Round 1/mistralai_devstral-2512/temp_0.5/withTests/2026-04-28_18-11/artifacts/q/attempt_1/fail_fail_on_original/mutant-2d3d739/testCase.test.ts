import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should properly define properties on objects", () => {
    const obj = {};
    const descriptor = {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true
    };
    
    // This test relies on object_defineProperty being a function
    // In the mutated version, it's set to false, which will cause an error
    return Q.fcall(() => {
      Object.defineProperty(obj, 'testProp', descriptor);
      return obj.testProp;
    }).then((value) => {
      expect(value).toBe(42);
    });
  });
});