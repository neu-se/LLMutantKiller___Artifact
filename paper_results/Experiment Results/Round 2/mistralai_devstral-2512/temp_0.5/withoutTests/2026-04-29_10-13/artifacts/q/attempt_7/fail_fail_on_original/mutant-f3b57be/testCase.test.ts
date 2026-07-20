const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Test the specific mutation in array_reduce shim
    // The mutation changes "if (arguments.length === 1)" to "if (false)"
    // which breaks the single-argument case handling

    // Create an array-like object that will trigger the shim
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Get the internal array_reduce function from Q's implementation
    // We need to access it through the Q module's internal structure
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const array_reduce = qModule.array_reduce;

    // Test the reduce with only a callback (no initial value)
    // This should trigger the single-argument path in the shim
    let result;
    let error = null;

    try {
      result = array_reduce(arrayLike, function(acc: number, val: number) {
        return acc + val;
      });
    } catch (e) {
      error = e;
    }

    // With original code, this should work and return 6
    // With mutated code, this should throw TypeError because the single-argument check is disabled
    if (error) {
      throw error; // Test fails if we get an error with original code
    }
    expect(result).toBe(6);
  });
});