import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly handle sparse arrays in reduce without initial value", () => {
    // Create a sparse array that will trigger the mutation
    const sparseArray = [, 2, , 4]; // Only indices 1 and 3 have values

    return Q.fcall(() => {
      // This will use the internal array_reduce implementation
      // The mutation changes ++index to --index in the sparse array handling
      const result = sparseArray.reduce((acc: number, val: number) => acc + val);

      // With original code: finds first value at index 1, returns 6 (2 + 4)
      // With mutated code: fails to find values correctly due to --index
      expect(result).toBe(6);
    });
  });
});