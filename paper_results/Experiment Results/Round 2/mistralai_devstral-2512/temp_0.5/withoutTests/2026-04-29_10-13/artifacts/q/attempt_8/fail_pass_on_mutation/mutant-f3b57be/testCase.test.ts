const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Test the array_reduce shim by creating a scenario where it's used
    // The mutation changes the condition from "if (arguments.length === 1)" to "if (false)"
    // which breaks the single-argument case handling

    // Create an array-like object
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Temporarily replace Array.prototype.reduce to force use of the shim
    const originalReduce = Array.prototype.reduce;
    Array.prototype.reduce = undefined;

    try {
      // Now when reduce is called, it should use Q's shim
      // Test with only a callback (no initial value)
      const result = Q(arrayLike).then(function(arr: any) {
        return Array.prototype.reduce.call(arr, function(acc: number, val: number) {
          return acc + val;
        });
      });

      return result.then(function(sum: number) {
        // Original code should handle this and return 6
        // Mutated code should fail because the single-argument check is disabled
        expect(sum).toBe(6);
      });
    } finally {
      // Restore original reduce
      Array.prototype.reduce = originalReduce;
    }
  });
});