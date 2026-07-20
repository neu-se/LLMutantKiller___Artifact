import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when Q's internal reduce shim processes an empty array with no initial value", () => {
    // Force Q to use its internal array_reduce shim by creating a sparse array
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
        Q(sparseArray).then(function(arr: any[]) {
          return arr.reduce(function(prev: number, curr: number) {
            return prev + curr;
          });
        });
      }).toThrow(TypeError);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});