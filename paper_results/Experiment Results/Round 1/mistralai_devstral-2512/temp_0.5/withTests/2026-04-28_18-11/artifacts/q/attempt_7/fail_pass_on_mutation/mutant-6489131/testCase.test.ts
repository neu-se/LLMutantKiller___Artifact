// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should handle sparse arrays with empty first slots", () => {
    // Create a sparse array where first slots are empty
    const sparseArray: any[] = [, , 5]; // indices 0 and 1 are empty

    // Use Q to test the reduce behavior
    return Q.fcall(() => {
      // Set a timeout to detect hanging
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Infinite loop detected - mutation present"));
        }, 100);

        try {
          // This should work in original code but hang in mutated code
          // because the mutation removes the break condition in the while loop
          const result = sparseArray.reduce((acc: number, val: number) => {
            return acc + val;
          });
          clearTimeout(timeout);
          resolve(result);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });
    }).then((result: number) => {
      // In original code, this should complete with result = 5
      expect(result).toBe(5);
    });
  });
});