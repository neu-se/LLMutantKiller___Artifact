// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays with undefined values in reduce", () => {
    // Create a sparse array where some indices are missing and others have undefined values
    const sparseArray = [1, , undefined, 3];
    // Index 1 is missing, index 2 has undefined value

    return Q(sparseArray).then((arr: any[]) => {
      let missingIndexCount = 0;
      let undefinedValueCount = 0;

      arr.reduce((sum: number, val: any, index: number) => {
        if (index === 1) { // This index is missing in the array
          missingIndexCount++;
        }
        if (index === 2 && val === undefined) { // This index exists but has undefined value
          undefinedValueCount++;
        }
        return sum;
      }, 0);

      // With original code (index in this):
      // - Index 1 (missing) should not be processed, so missingIndexCount stays 0
      // - Index 2 (exists with undefined) should be processed, so undefinedValueCount becomes 1

      // With mutated code (if true):
      // - Both indices would be processed, making missingIndexCount = 1

      expect(missingIndexCount).toBe(0);
      expect(undefinedValueCount).toBe(1);
    });
  });
});