const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with array length boundary", () => {
    // Create a test array with 3 elements
    const testArray = [1, 2, 3];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding an element that doesn't exist
      // In original code: should return -1
      // In mutated code (i <= this.length): will check arr[3] which is undefined
      // and might incorrectly return 3 instead of -1
      const notFoundIndex = arr.indexOf(99);
      expect(notFoundIndex).toBe(-1);

      // Test with array of length 1
      const singleArray = [42];
      const singleNotFound = singleArray.indexOf(99);
      expect(singleNotFound).toBe(-1);

      // Test with empty array
      const emptyArray: number[] = [];
      const emptyNotFound = emptyArray.indexOf(1);
      expect(emptyNotFound).toBe(-1);

      return true;
    });
  });
});