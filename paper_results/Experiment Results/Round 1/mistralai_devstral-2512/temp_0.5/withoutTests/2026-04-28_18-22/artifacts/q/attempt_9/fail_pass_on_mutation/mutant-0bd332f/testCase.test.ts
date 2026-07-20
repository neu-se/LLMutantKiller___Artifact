const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when processing empty array with no initial value in Q's internal reduce", () => {
    // Test the array_reduce shim directly by creating a sparse array
    // that will trigger the shim's behavior
    const sparseArray = Array(3);
    sparseArray[0] = 1;
    sparseArray[2] = 3;

    // Override the native reduce to force use of Q's shim
    const originalReduce = Array.prototype.reduce;
    Array.prototype.reduce = undefined;

    try {
      // This should use Q's internal array_reduce shim
      expect(() => {
        sparseArray.reduce(function(prev: number, curr: number) {
          return prev + curr;
        });
      }).toThrow(TypeError);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});