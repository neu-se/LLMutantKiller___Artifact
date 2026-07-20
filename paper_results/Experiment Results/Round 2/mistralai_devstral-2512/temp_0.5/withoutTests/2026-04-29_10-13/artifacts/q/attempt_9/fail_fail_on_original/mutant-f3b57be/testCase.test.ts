const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Directly test the array_reduce shim by accessing it through Q's internal structure
    // The mutation changes "if (arguments.length === 1)" to "if (false)" which breaks single-arg handling

    // Create a test array
    const testArray = [1, 2, 3];

    // Access the internal array_reduce function from Q
    // We need to get it from the Q module's closure
    const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const qInstance = qFactory();
    const array_reduce = qInstance.array_reduce;

    // Test the reduce with only a callback (no initial value)
    // This should trigger the single-argument path in the shim
    let result;
    let error = null;

    try {
      result = array_reduce(testArray, function(acc: number, val: number) {
        return acc + val;
      });
    } catch (e) {
      error = e;
    }

    // With original code, this should work and return 6
    // With mutated code, this should throw TypeError
    if (error) {
      throw error; // Test fails if we get an error with original code
    }
    expect(result).toBe(6);
  });
});