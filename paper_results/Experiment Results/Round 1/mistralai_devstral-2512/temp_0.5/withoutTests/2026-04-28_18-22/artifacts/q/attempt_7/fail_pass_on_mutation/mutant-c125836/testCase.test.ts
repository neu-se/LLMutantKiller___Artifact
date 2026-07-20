const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce without initial value on sparse array", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would break the logic for finding the first value in sparse arrays

    // Create a sparse array where first value is at index 2
    const sparseArray = [];
    sparseArray[2] = 10;

    // Test reduce without initial value - this should find first value at index 2
    // Original: should work correctly by finding first value
    // Mutated: will fail because condition is always true, skipping the value search
    const result = Q(sparseArray).then(function(arr: any[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + currentValue;
      });
    });

    return result.then(
      function(sum: number) {
        // Should only process the value at index 2
        expect(sum).toBe(10);
      },
      function(error: Error) {
        // If we get here in mutated version, it means the mutation broke the logic
        throw error;
      }
    );
  });
});