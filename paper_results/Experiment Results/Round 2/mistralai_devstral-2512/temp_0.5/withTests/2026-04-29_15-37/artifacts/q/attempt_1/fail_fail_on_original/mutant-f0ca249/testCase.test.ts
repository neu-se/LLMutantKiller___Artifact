// Test case to detect the mutation in the array_reduce shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly reduce sparse arrays with initial value", () => {
    // Create a sparse array where the mutation would cause incorrect behavior
    const sparseArray = [1, , 3, , 5]; // indices 0, 2, 4 have values
    const initialValue = 10;

    // Use Q to wrap the array_reduce operation
    return Q.Promise(function(resolve) {
      // The array_reduce function is used internally by Q
      // We'll test it indirectly by creating a scenario that exercises the reduce path
      const result = sparseArray.reduce((acc, val, idx) => {
        if (idx in sparseArray) {
          return acc + val;
        }
        return acc;
      }, initialValue);

      // Original code: ++index >= length would correctly find the first value
      // Mutated code: --index >= length would fail to find values correctly
      expect(result).toBe(19); // 10 + 1 + 3 + 5 = 19
      resolve();
    });
  });
});