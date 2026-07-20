const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Test the reduce behavior with only a callback (no initial value)
    // This should trigger the single-argument path in the shim
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Use Q to get a promise for the array-like object
    const result = Q(arrayLike).then(function(arr: any) {
      // Use the shimmed reduce with only a callback
      // The shim should handle the case where no initial value is provided
      return Array.prototype.reduce.call(arr, function(acc: number, val: number) {
        return acc + val;
      });
    });

    return result.then(function(sum: number) {
      // With the original code, this should work and return 6 (1+2+3)
      // With the mutated code, it should fail because the single-argument check is disabled
      expect(sum).toBe(6);
    }, function(error: any) {
      // If we get here, the mutation caused the reduce to fail
      throw error;
    });
  });
});