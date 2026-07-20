// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should handle empty sparse arrays without hanging", () => {
    // Create a completely empty sparse array
    const emptySparseArray = [];
    emptySparseArray[10] = undefined; // Make it sparse but with no actual values

    // This test will hang in the mutated code because:
    // 1. The array has no initial value provided to reduce
    // 2. The mutation removes the break condition in the while loop
    // 3. The loop will run indefinitely trying to find a value
    return Q.fcall(() => {
      // Set a timeout to detect hanging
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Operation timed out - likely infinite loop"));
        }, 100);

        try {
          // This should throw TypeError in original code
          // but hang in mutated code
          const result = emptySparseArray.reduce((acc: number, val: number) => {
            return acc + val;
          });
          clearTimeout(timeout);
          resolve(result);
        } catch (error) {
          clearTimeout(timeout);
          resolve(error); // Expected TypeError in original code
        }
      });
    }).then((result) => {
      // In original code, we expect a TypeError
      expect(result).toBeInstanceOf(TypeError);
    });
  });
});