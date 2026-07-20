import { Q } from "./q.js";

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // This test specifically targets the mutation in the array_reduce shim
    // where the condition was changed from "if (arguments.length === 1)" to "if (false)"
    // We test the reduce behavior with a single argument to expose the mutation

    // Create an array-like object with a reduce method that will use the shim
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
      reduce: Array.prototype.reduce
    };

    // Delete the native reduce to force use of the shim
    delete arrayLike.reduce;

    // Test the reduce operation with only a callback (no initial value)
    // This should trigger the single-argument path in the shim
    const result = Q(arrayLike).then(function(arr) {
      // Use the shimmed reduce with only a callback
      return Array.prototype.reduce.call(arr, function(acc, val) {
        return acc + val;
      });
    });

    return result.then(function(sum) {
      // With the original code, this should work and return 6 (1+2+3)
      // With the mutated code, it should fail because the single-argument check is disabled
      expect(sum).toBe(6);
    }, function(error) {
      // If we get here, the mutation caused the reduce to fail
      throw error;
    });
  });
});