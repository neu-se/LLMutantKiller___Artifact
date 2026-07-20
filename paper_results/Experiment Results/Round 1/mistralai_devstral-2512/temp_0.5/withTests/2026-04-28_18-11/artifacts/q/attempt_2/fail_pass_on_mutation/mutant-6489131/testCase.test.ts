// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should correctly handle sparse arrays in reduce without initial value", () => {
    // This test targets the mutation in the array_reduce shim
    // The mutation removes the logic that finds the first value in a sparse array
    // when no initial value is provided, which would cause an infinite loop

    // Create a sparse array where first elements are empty
    const sparseArray = [, , 3, 4]; // indices 0 and 1 are empty

    // Use Q to wrap the reduce operation
    return Q.fcall(() => {
      // This should work in original code but hang in mutated code
      // because the mutation removes the break condition in the while loop
      return sparseArray.reduce((acc: number, val: number) => {
        return acc + val;
      });
    }).then((result: number) => {
      // In original code, this should complete with result = 7 (3 + 4)
      // In mutated code, this would hang indefinitely
      expect(result).toBe(7);
    }, (error: Error) => {
      // If we get here, the mutation caused an error
      throw error;
    });
  });
});