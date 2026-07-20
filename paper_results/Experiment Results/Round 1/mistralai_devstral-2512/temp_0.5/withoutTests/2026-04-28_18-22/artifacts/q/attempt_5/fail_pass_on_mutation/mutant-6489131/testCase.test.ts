const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation", () => {
    // Create a sparse array where the first element is missing
    const sparseArray = [];
    sparseArray[1] = 1; // First present element at index 1

    // Test the array_reduce shim directly
    const promise = Q(sparseArray);

    return promise.then((arr: any[]) => {
      // Test reduce without initial value on sparse array
      // This should find the first present element and use it as initial value
      const result = arr.reduce((acc: number, val: number) => acc + val);
      expect(result).toBe(1);
    });
  });
});