const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Test the array_reduce shim directly by creating a scenario
    // where the shim is used (when reduce is not available)

    // Create an object that will use the shim
    const obj = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Force use of the shim by temporarily removing Array.prototype.reduce
    const originalReduce = Array.prototype.reduce;
    delete Array.prototype.reduce;

    try {
      // Now when we call reduce, it should use the shim from Q
      // The shim should handle the case where only a callback is provided
      const result = Q(obj).then(function(arr: any) {
        return Array.prototype.reduce.call(arr, function(acc: number, val: number) {
          return acc + val;
        });
      });

      return result.then(function(sum: number) {
        expect(sum).toBe(6);
      });
    } finally {
      // Restore the original reduce
      Array.prototype.reduce = originalReduce;
    }
  });
});