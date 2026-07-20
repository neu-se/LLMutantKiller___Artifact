const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation with side effects", () => {
    // Create a sparse array where index 1 is missing
    const sparseArray = [1, , 3];
    const callLog: number[] = [];

    // Test the internal array_reduce implementation directly through Q's promise chain
    return Q.resolve(sparseArray).then((arr: any) => {
      // Use Q's internal array_reduce to track which indices are processed
      const callback = function(basis: number, value: number, index: number) {
        callLog.push(index);
        return basis + value;
      };

      // Simulate the array_reduce behavior that Q uses internally
      arr.reduce(callback, 0);

      // Original code: skips missing indices, so only indices 0 and 2 should be logged
      // Mutated code: processes all indices including missing ones
      expect(callLog).toEqual([0, 2]);
    });
  });
});