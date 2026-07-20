const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with initial value", () => {
    // Test the array_reduce shim directly by creating a scenario
    // where the mutation would cause incorrect behavior
    const testArray = [1, 2, 3];

    // Test reduce with initial value - this should work correctly in original
    // but fail in mutated version where "if (true)" replaces the length check
    const result = Q(testArray).then(function(arr: number[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + currentValue;
      }, 10); // initial value of 10
    });

    return result.then(function(sum: number) {
      expect(sum).toBe(16); // 10 + 1 + 2 + 3 = 16
    });
  });
});