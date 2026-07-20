const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with array containing holes", () => {
    // Create a sparse array with a hole at index 1
    const sparseArray = [1, , 3];

    // Use Q to create a promise that resolves to our sparse array
    const promise = Q.resolve(sparseArray);

    return promise.then((arr: any[]) => {
      // Test finding undefined in sparse array
      // In original code: should return -1 (holes are not the same as undefined)
      // In mutated code (i <= this.length): will check arr[3] which is undefined
      // and might return 3 instead of -1
      const indexOfUndefined = arr.indexOf(undefined);
      expect(indexOfUndefined).toBe(-1);

      // Test finding element 3 which exists at index 2
      expect(arr.indexOf(3)).toBe(2);

      return true;
    });
  });
});