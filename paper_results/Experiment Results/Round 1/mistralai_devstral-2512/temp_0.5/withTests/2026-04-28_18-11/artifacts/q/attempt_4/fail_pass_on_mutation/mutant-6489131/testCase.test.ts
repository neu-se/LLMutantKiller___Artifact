// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should correctly reduce sparse arrays without initial value", () => {
    // Create a sparse array where first element is missing
    const sparseArray: any[] = [, 2, 3]; // index 0 is empty

    // Use Q to test the reduce behavior
    return Q.fcall(() => {
      // This should work in original code but hang in mutated code
      // because the mutation removes the break condition in the while loop
      // that finds the first value in sparse arrays
      return sparseArray.reduce((acc: number, val: number) => {
        return acc + val;
      });
    }).then((result: number) => {
      // In original code, this should complete with result = 5 (2 + 3)
      // In mutated code, this would hang indefinitely
      expect(result).toBe(5);
    });
  });
});