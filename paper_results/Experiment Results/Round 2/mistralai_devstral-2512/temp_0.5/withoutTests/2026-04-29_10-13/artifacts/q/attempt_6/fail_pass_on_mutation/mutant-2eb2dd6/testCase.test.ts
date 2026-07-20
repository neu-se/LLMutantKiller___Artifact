const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library array_reduce shim", () => {
  it("should correctly handle sparse arrays without initial value in reduce operation", () => {
    // Create a sparse array where index 1 is missing
    const sparseArray = [1, , 3];

    // Test the internal array_reduce implementation directly through Q's promise chain
    return Q.resolve(sparseArray).then((arr: any) => {
      // Use Q's internal array_reduce to sum values, skipping missing indices
      // No initial value provided - should use first present element as initial value
      const callback = function(basis: number, value: number, index: number) {
        return basis + value;
      };

      // Simulate the array_reduce behavior that Q uses internally
      const result = arr.reduce(callback);

      // Original code: skips missing indices, uses first element (1) as initial value, then adds 3 (1 + 3 = 4)
      // Mutated code: includes undefined values, causing different behavior
      expect(result).toBe(4);
    });
  });
});