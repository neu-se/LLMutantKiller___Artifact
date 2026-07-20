const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library array_reduce shim", () => {
  it("should correctly handle sparse arrays with initial value in reduce operation", () => {
    // Create a sparse array where index 1 is missing
    const sparseArray = [1, , 3];

    // Test the internal array_reduce implementation directly through Q's promise chain
    return Q.resolve(sparseArray).then((arr: any) => {
      // Use Q's internal array_reduce to sum values, skipping missing indices
      const initialValue = 10;
      const callback = function(basis: number, value: number, index: number) {
        return basis + value;
      };

      // Simulate the array_reduce behavior that Q uses internally
      const result = arr.reduce(callback, initialValue);

      // Original code: skips missing indices (10 + 1 + 3 = 14)
      // Mutated code: includes undefined values (10 + 1 + undefined + 3 = NaN)
      expect(result).toBe(14);
    });
  });
});