import { Q } from "./q.js";

describe("Q library array_reduce mutation", () => {
  it("should correctly handle sparse arrays in reduce operations", () => {
    // Create a sparse array with some missing indices
    const sparseArray = [1, , 3]; // index 1 is missing
    sparseArray[4] = 5; // index 3 is missing

    // Use Q to wrap a promise that resolves with our sparse array
    const promise = Q.resolve(sparseArray);

    // Use Q's reduce-like operation (through promise dispatch)
    // to sum only the existing elements
    return promise.dispatch("reduce", [
      function (callback: any) {
        return function (basis: number, value: number, index: number) {
          // This should only be called for indices that exist in the array
          // In the original code, index 1 and 3 should be skipped
          // In the mutated code, all indices will be processed (including missing ones)
          return callback(basis + value, index);
        };
      },
      0,
    ]).then((result: any) => {
      // Original code: should sum 1 + 3 + 5 = 9 (skipping missing indices)
      // Mutated code: will try to sum undefined values at missing indices, resulting in NaN
      expect(result).toBe(9);
    });
  });
});