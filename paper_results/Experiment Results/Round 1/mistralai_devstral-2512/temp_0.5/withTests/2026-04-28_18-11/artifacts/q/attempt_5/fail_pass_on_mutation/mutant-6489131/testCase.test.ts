// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should handle sparse arrays with no initial value without hanging", () => {
    // Create a sparse array where first elements are empty
    const sparseArray: any[] = [, , 3]; // indices 0 and 1 are empty

    // Set a timeout to detect hanging behavior
    let completed = false;
    const timeout = setTimeout(() => {
      if (!completed) {
        throw new Error("Test timed out - likely infinite loop from mutation");
      }
    }, 1000);

    // Use Q to test the reduce behavior
    return Q.fcall(() => {
      // This should work in original code but hang in mutated code
      // because the mutation removes the break condition in the while loop
      return sparseArray.reduce((acc: number, val: number) => {
        return acc + val;
      });
    }).then((result: number) => {
      completed = true;
      clearTimeout(timeout);
      // In original code, this should complete with result = 3
      expect(result).toBe(3);
    }, (error: Error) => {
      completed = true;
      clearTimeout(timeout);
      throw error;
    });
  });
});