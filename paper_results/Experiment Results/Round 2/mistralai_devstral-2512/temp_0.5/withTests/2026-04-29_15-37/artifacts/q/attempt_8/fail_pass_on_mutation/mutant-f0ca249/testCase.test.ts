import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly handle sparse arrays without initial value in reduce", () => {
    // Create a sparse array that will trigger the specific code path
    const sparseArray = [1, , 3]; // indices 0 and 2 have values, index 1 is hole

    return Q.fcall(() => {
      // This will trigger the internal array_reduce implementation
      // when called without initial value on a sparse array
      const result = sparseArray.reduce((acc: number, val: number) => acc + val);

      // Original code: finds first value at index 0, returns 4 (1 + 3)
      // Mutated code: --index causes it to start at -1, fails to find values
      expect(result).toBe(4);
    });
  });
});