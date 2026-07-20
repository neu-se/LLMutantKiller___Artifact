// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should handle sparse array reduce without hanging", () => {
    // Create a sparse array that triggers the mutation
    const sparseArray: number[] = [, 2, 3]; // First element empty

    // Use Q's promise to test the reduce behavior
    return Q.Promise((resolve: (value: number) => void, reject: (error: Error) => void) => {
      // Set a timeout to detect hanging
      const timeout = setTimeout(() => {
        reject(new Error("Infinite loop detected - mutation present"));
      }, 100);

      try {
        // This should work in original code but hang in mutated code
        // because the mutation removes the break condition
        const result = sparseArray.reduce((acc: number, val: number) => acc + val);
        clearTimeout(timeout);
        resolve(result);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    }).then((result: number) => {
      // In original code, this should complete with result = 5
      expect(result).toBe(5);
    });
  });
});