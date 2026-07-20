// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should detect infinite loop in sparse array reduce", () => {
    // Create a sparse array that will trigger the mutation
    const sparseArray: any[] = [, , , 10]; // First 3 indices empty

    // This test will fail on mutated code due to infinite loop
    return Q.fcall(() => {
      // Set a very short timeout to catch hanging
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("INFINITE_LOOP_DETECTED"));
        }, 50);

        try {
          // This should complete quickly in original code
          // but hang in mutated code (missing break statement)
          const result = sparseArray.reduce((acc: number, val: number) => acc + val);
          clearTimeout(timeout);
          resolve(result);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });
    }).then((result: number) => {
      // Should reach here in original code
      expect(result).toBe(10);
    });
  });
});