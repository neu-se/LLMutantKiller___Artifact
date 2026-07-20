const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with two arguments on sparse array", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would incorrectly trigger the initial value search even when initial value is provided

    // Create a sparse array where first value is at index 1
    const sparseArray = [];
    sparseArray[1] = 5;
    sparseArray[3] = 7;

    // Test reduce with initial value - this should use the provided initial value (100)
    // Original: should use initial value 100 and sum 100 + 5 + 7 = 112
    // Mutated: will incorrectly search for first value due to always-true condition
    const result = Q(sparseArray).then(function(arr: any[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + currentValue;
      }, 100); // initial value of 100
    });

    return result.then(function(sum: number) {
      // Original should return 112 (100 + 5 + 7)
      // Mutated will return different value because it searches for first value
      expect(sum).toBe(112);
    });
  });
});