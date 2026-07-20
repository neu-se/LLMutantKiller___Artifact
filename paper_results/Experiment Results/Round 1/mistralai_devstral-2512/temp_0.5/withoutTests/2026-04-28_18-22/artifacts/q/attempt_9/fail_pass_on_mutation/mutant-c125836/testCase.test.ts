const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with initial value on array with undefined elements", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would break the logic for handling arrays with undefined elements

    // Create an array with undefined elements that will trigger the shim
    const arrayWithUndefined = [undefined, undefined, 3, 4];

    // Test reduce with initial value
    // Original: should use initial value 5 and sum 5 + 3 + 4 = 12
    // Mutated: will incorrectly search for first defined value due to always-true condition
    const result = Q(arrayWithUndefined).then(function(arr: any[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + (currentValue || 0);
      }, 5); // initial value of 5
    });

    return result.then(function(sum: number) {
      // Original should return 12 (5 + 0 + 0 + 3 + 4)
      // Mutated will return different value because it searches for first defined value
      expect(sum).toBe(12);
    });
  });
});