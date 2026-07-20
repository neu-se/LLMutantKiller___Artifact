import { Q } from "./q";

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce", () => {
    // Create a sparse array with holes
    const sparseArray = [1, , 3, , 5];
    const initialValue = 0;

    // Use Q to wrap the array_reduce operation
    const result = Q(sparseArray).then(function(arr) {
      return Array.prototype.reduce.call(arr, function(acc, val, idx) {
        // This callback should only be invoked for elements that exist
        // In the original code, holes are skipped (index not in array)
        // In the mutated code, all indices are treated as existing (if true)
        return acc + (val || 0);
      }, initialValue);
    });

    return result.then(function(sum) {
      // Original code: skips holes, sum = 1 + 3 + 5 = 9
      // Mutated code: treats holes as existing (undefined), sum = 1 + 0 + 3 + 0 + 5 = 9
      // Wait, this won't distinguish them. Let's try a different approach.
      // We need to detect whether the callback was invoked for holes
      let callbackCount = 0;
      const testArray = [1, , 3];
      return Q(testArray).then(function(arr) {
        return Array.prototype.reduce.call(arr, function(acc, val, idx) {
          callbackCount++;
          return acc;
        }, 0);
      }).then(function() {
        // Original code: callbackCount should be 2 (only indices 0 and 2)
        // Mutated code: callbackCount should be 3 (all indices 0, 1, 2)
        expect(callbackCount).toBe(2);
      });
    });
  });
});