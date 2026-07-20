const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with sparse arrays", () => {
    // Create a sparse array with holes
    const sparseArray = [1, , 3]; // index 1 is empty/hole

    // Use Q to create a promise that resolves to our sparse array
    const promise = Q.resolve(sparseArray);

    return promise.then((arr: any[]) => {
      // Test finding element 1 (should be at index 0)
      expect(arr.indexOf(1)).toBe(0);

      // Test finding element 3 (should be at index 2)
      expect(arr.indexOf(3)).toBe(2);

      // Test finding undefined in sparse array
      // In original code: should return -1 (holes are not undefined)
      // In mutated code: might return 1 (the hole position) or 3 (past the end)
      const indexOfUndefined = arr.indexOf(undefined);
      expect(indexOfUndefined).toBe(-1);

      // Test with array that has undefined at the end
      const arrayWithUndefined = [1, 2, undefined];
      expect(arrayWithUndefined.indexOf(undefined)).toBe(2);

      return true;
    });
  });
});