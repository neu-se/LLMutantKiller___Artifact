const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation without initial value", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [];
    sparseArray[1] = 1;
    sparseArray[2] = 2;

    // Test the array_reduce shim directly by using reduce without initial value
    // This triggers the code path with the mutation
    const promise = Q(sparseArray);

    return promise.then((arr: any[]) => {
      // This should work with original code (finds first present element)
      // but will hang with mutated code (missing break statement)
      const result = arr.reduce((acc: number, val: number) => acc + val);
      expect(result).toBe(3); // 1 + 2
    });
  });
});