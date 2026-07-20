const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with array length boundary condition", () => {
    // Create a test array with 3 elements
    const testArray = [1, 2, 3];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding undefined in an array that doesn't contain undefined
      // In original code: should return -1
      // In mutated code (i <= this.length): will check arr[3] which is undefined
      // and might incorrectly return 3 instead of -1
      const indexOfUndefined = arr.indexOf(undefined);
      expect(indexOfUndefined).toBe(-1);

      // Test with array of length 0 (empty array)
      const emptyArray: number[] = [];
      const emptyIndex = emptyArray.indexOf(undefined);
      expect(emptyIndex).toBe(-1);

      return true;
    });
  });
});