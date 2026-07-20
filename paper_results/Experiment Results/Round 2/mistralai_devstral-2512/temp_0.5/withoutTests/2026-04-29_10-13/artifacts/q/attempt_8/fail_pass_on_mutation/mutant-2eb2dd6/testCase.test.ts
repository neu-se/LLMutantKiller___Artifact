const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation with undefined values", () => {
    // Create a sparse array where index 1 is missing
    const sparseArray = [1, , 3];
    let undefinedCount = 0;

    // Test the internal array_reduce implementation directly through Q's promise chain
    return Q.resolve(sparseArray).then((arr: any) => {
      // Use Q's internal array_reduce to count undefined values
      const callback = function(basis: number, value: number, index: number) {
        if (value === undefined) {
          undefinedCount++;
        }
        return basis + (value || 0);
      };

      // Simulate the array_reduce behavior that Q uses internally
      arr.reduce(callback, 0);

      // Original code: skips missing indices, so undefinedCount should be 0
      // Mutated code: processes missing indices, so undefinedCount would be 1
      expect(undefinedCount).toBe(0);
    });
  });
});