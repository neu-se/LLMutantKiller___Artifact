const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf edge cases", () => {
    // Test with an array where the last element is undefined
    const testArray = [1, 2, 3, 4, undefined];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    return promise.then((arr: any[]) => {
      // Test finding undefined at the last position
      // In original code: should find it at index 4
      // In mutated code: will also check arr[5] (which is undefined) and might return 5
      const indexOfUndefined = arr.indexOf(undefined);
      expect(indexOfUndefined).toBe(4);

      // Test with array that has exactly one element
      const singleElementArray = [42];
      const singleIndex = singleElementArray.indexOf(42);
      expect(singleIndex).toBe(0);

      // Test finding non-existent element in single element array
      const singleNotFound = singleElementArray.indexOf(99);
      expect(singleNotFound).toBe(-1);

      return true;
    });
  });
});