const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Test the mutation in array_reduce shim by creating a scenario
    // where the shim is used and the single-argument case is triggered

    // Create an array-like object that will use the shim
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Temporarily remove Array.prototype.reduce to force use of the shim
    const originalReduce = Array.prototype.reduce;
    Array.prototype.reduce = undefined;

    try {
      // Create a promise that will use the shim when reduce is called
      const promise = Q.resolve(arrayLike).then(function(arr: any) {
        // Call reduce with only a callback (no initial value)
        // This should trigger the single-argument path in the shim
        return Array.prototype.reduce.call(arr, function(acc: number, val: number) {
          return acc + val;
        });
      });

      return promise.then(function(sum: number) {
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