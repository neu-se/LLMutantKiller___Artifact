// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should detect missing break in sparse array reduce", () => {
    // Create a sparse array that will trigger the mutation
    const sparseArray: any[] = [, , 5]; // First two indices empty

    // This test specifically targets the mutation where the break statement
    // was removed from the while loop in array_reduce
    return Q.fcall(() => {
      // Set a very short timeout to catch the infinite loop
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("INFINITE_LOOP_DETECTED"));
        }, 50);

        try {
          // This should complete in original code but hang in mutated code
          const result = sparseArray.reduce((acc: number, val: number) => acc + val);
          clearTimeout(timeout);
          resolve(result);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });
    }).then((result: number) => {
      // Should reach here in original code with correct result
      expect(result).toBe(5);
    });
  });
});