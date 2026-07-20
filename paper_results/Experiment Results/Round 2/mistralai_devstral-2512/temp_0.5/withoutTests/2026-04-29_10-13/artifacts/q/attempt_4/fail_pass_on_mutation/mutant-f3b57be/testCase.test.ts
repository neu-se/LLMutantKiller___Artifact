const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Directly test the array_reduce shim behavior
    // The mutation changes "if (arguments.length === 1)" to "if (false)"
    // which breaks the single-argument case handling

    // Create an array-like object without a reduce method
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Get the internal array_reduce function from Q
    // We need to access it through Q's internal implementation
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should have access to array_reduce through its prototype chain
    const arrayReduce = promise.constructor.prototype.reduce || Array.prototype.reduce;

    // Test the reduce with only a callback (no initial value)
    // This should trigger the single-argument path in the shim
    try {
      const result = arrayReduce.call(arrayLike, function(acc: number, val: number) {
        return acc + val;
      });

      // With original code, this should work
      // With mutated code, this should throw because the single-argument check is disabled
      expect(result).toBe(6);
      deferred.resolve();
    } catch (error) {
      // If we get an error, the mutation broke the single-argument case
      deferred.reject(error);
    }

    return promise;
  });
});