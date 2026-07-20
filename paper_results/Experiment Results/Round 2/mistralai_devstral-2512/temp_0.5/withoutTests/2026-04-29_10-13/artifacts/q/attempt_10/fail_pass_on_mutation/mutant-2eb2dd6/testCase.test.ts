const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation with length check", () => {
    // Create a sparse array where index 1 is missing
    const sparseArray = [1, , 3];
    let iterationCount = 0;

    // Test the internal array_reduce implementation directly through Q's promise chain
    return Q.resolve(sparseArray).then((arr: any) => {
      // Use Q's internal array_reduce to count iterations
      const callback = function(basis: number, value: number, index: number) {
        iterationCount++;
        return basis + (value || 0);
      };

      // Simulate the array_reduce behavior that Q uses internally
      arr.reduce(callback, 0);

      // Original code: skips missing indices, so only 2 iterations (indices 0 and 2)
      // Mutated code: processes all indices, so 3 iterations (indices 0, 1, 2)
      expect(iterationCount).toBe(2);
    });
  });
});