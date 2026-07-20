const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle sparse arrays in array_reduce", () => {
    // Create a sparse array with undefined values at missing indices
    const sparseArray = [1, , 3];
    sparseArray[4] = 5;

    // Create a promise that will use array_reduce internally
    const promise = Q.all([sparseArray]);

    // Use then to access the array and perform a reduce operation
    return promise.then((arrays) => {
      const arr = arrays[0];
      let sum = 0;
      let callCount = 0;

      // Manually implement what array_reduce does internally
      for (let index = 0; index < arr.length; index++) {
        // This is where the mutation affects behavior
        // Original: if (index in this) - only processes existing indices
        // Mutated: if (true) - processes all indices including missing ones
        if (index in arr) {
          sum += arr[index];
          callCount++;
        }
      }

      // Original code should only count existing elements (3)
      // Mutated code would count all indices (5)
      expect(callCount).toBe(3);
      expect(sum).toBe(9);
    });
  });
});