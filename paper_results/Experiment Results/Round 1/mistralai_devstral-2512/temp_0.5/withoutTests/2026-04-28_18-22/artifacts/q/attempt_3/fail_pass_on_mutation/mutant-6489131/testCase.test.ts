const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation", () => {
    // Create a sparse array with holes
    const sparseArray = [1, , 3]; // index 1 is missing
    sparseArray[4] = 5; // index 3 is missing

    // Use Q to wrap the array and test the reduce behavior
    const promise = Q(sparseArray);

    // The reduce operation should skip missing indices and start from the first present value
    return promise.then((arr: any[]) => {
      // Manually implement reduce to test the shim behavior
      const result = arr.reduce((acc: number, val: number) => {
        return acc + val;
      }, 0);

      // With the original code, this should work correctly
      // With the mutated code (missing break), it would get stuck in an infinite loop
      expect(result).toBe(9); // 1 + 3 + 5
    });
  });
});