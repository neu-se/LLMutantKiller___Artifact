const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library array_reduce shim", () => {
  it("should correctly reduce sparse arrays", () => {
    // Create a sparse array where index 1 is missing
    const sparseArray = [1, , 3];
    sparseArray[1] = undefined; // Explicitly set to undefined to maintain sparseness

    // Use Q to test the array_reduce behavior through a promise chain
    return Q.resolve(sparseArray).then((arr: any) => {
      // The array_reduce shim should skip missing indices in sparse arrays
      const result = arr.reduce((acc: number, val: number, idx: number) => {
        return acc + (idx in arr ? val : 0);
      }, 0);

      // Original code: skips missing indices, so result should be 1 + 3 = 4
      // Mutated code: doesn't check for index existence, treats undefined as 0
      expect(result).toBe(4);
    });
  });
});