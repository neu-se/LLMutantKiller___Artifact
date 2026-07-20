const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce without initial value on empty array", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would incorrectly trigger the initial value logic even when initial value is provided

    // Create a sparse array that will trigger the shim's behavior
    const sparseArray = [1];
    sparseArray[2] = 3; // Create a sparse array

    // Test reduce without initial value - this should throw TypeError in original
    // but might behave differently in mutated version
    const result = Q(sparseArray).then(function(arr: any[]) {
      return arr.reduce(function(accumulator: number, currentValue: number) {
        return accumulator + currentValue;
      });
    });

    return result.then(
      function() {
        // If we get here, the mutation caused unexpected behavior
        throw new Error("Expected TypeError for reduce without initial value on sparse array");
      },
      function(error: Error) {
        // This is the expected path for original code
        expect(error).toBeInstanceOf(TypeError);
      }
    );
  });
});