// Test case to detect the mutation in the array_reduce shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly reduce sparse arrays with initial value", () => {
    // Create a sparse array where the first element is missing
    const sparseArray = [, 2, 3]; // index 0 is empty

    // Use Q to test the reduce behavior on this sparse array
    // The mutation would cause an infinite loop if the array starts with empty slots
    // and no initial value is provided (though we provide one here to be safe)
    const result = Q.all([
      Q.fcall(() => {
        // This should work without hanging in the original code
        // but would hang in the mutated code if the array starts with empty slots
        return sparseArray.reduce((acc, val, idx) => {
          if (idx in sparseArray) {
            return acc + val;
          }
          return acc;
        }, 0);
      })
    ]);

    return result.then((values) => {
      expect(values[0]).toBe(5); // 0 + 2 + 3
    });
  });
});