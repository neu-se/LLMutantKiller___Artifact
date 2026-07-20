const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with initial value on empty array", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would incorrectly trigger the initial value logic even when initial value is provided

    const emptyArray: number[] = [];

    // Test reduce with initial value on empty array
    // Original: should return initial value (5)
    // Mutated: might behave incorrectly due to always-true condition
    const result = Q(emptyArray).then(function(arr: number[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + currentValue;
      }, 5); // initial value of 5
    });

    return result.then(function(sum: number) {
      expect(sum).toBe(5);
    });
  });
});