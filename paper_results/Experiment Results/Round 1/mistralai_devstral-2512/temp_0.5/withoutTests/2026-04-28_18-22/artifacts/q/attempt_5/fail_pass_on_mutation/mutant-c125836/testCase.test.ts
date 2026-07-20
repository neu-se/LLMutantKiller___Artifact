const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with initial value on sparse array", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would break the logic for finding the first value in sparse arrays

    // Create a sparse array that will trigger the shim's behavior
    const sparseArray = [];
    sparseArray[1] = 2;
    sparseArray[3] = 4;

    // Test reduce with initial value - this should work correctly in original
    // but fail in mutated version where the condition is always true
    const result = Q(sparseArray).then(function(arr: any[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + currentValue;
      }, 0); // initial value of 0
    });

    return result.then(function(sum: number) {
      // In original: should find first value at index 1 (value 2) and sum 2 + 4 = 6
      // In mutated: might behave incorrectly due to always-true condition
      expect(sum).toBe(6);
    });
  });
});