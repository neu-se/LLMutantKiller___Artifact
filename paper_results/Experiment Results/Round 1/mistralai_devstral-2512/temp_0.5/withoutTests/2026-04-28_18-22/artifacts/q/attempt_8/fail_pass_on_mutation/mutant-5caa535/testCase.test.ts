const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with array containing undefined values", () => {
    // Create a test array with undefined at the end
    const testArray = [1, 2, 3, undefined];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    return promise.then((arr: any[]) => {
      // Test finding undefined which exists at index 3
      // In original code: should return 3
      // In mutated code (i <= this.length): will check arr[4] which is also undefined
      // and might return 4 instead of 3
      const indexOfUndefined = arr.indexOf(undefined);
      expect(indexOfUndefined).toBe(3);

      // Test with array where we search for a value that doesn't exist
      // and the array has undefined at the end
      const notFoundIndex = arr.indexOf(99);
      expect(notFoundIndex).toBe(-1);

      return true;
    });
  });
});