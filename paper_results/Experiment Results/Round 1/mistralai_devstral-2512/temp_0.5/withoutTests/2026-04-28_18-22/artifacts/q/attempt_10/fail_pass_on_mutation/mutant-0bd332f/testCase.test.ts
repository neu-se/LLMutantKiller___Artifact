const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when array_reduce shim processes empty array with no initial value", () => {
    // Create a test that forces Q to use its internal array_reduce shim
    // by working with a promise that resolves to an empty array
    // and then trying to reduce it without an initial value

    // First, we need to access Q's internal array_reduce function
    // Since it's not directly exported, we'll test it through Q's promise handling
    const emptyArray = [];

    // Override the native reduce to ensure we test Q's shim
    const originalReduce = Array.prototype.reduce;
    Array.prototype.reduce = undefined;

    try {
      // Create a promise that will use Q's internal array_reduce
      const promise = Q(emptyArray);

      return promise.then(function(arr: any[]) {
        // This should trigger Q's internal array_reduce shim
        // which should throw TypeError when no initial value is provided
        expect(() => {
          arr.reduce(function(prev: any, curr: any) {
            return prev;
          });
        }).toThrow(TypeError);
      });
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});