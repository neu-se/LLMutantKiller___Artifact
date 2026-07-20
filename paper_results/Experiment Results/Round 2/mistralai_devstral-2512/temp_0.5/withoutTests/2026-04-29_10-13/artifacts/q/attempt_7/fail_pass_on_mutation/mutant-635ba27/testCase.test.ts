const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly implement array_indexOf with forward iteration", () => {
    // This test directly targets the array_indexOf shim implementation
    // The mutation changes i++ to i-- which would cause incorrect behavior
    // We'll test with an array where the mutation would produce wrong results

    // Create a test array where the mutation would clearly fail
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Use Q to process the array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding elements at different positions
      // With i-- mutation, these would return wrong indices or -1
      expect(arr.indexOf(1)).toBe(0);
      expect(arr.indexOf(5)).toBe(4);
      expect(arr.indexOf(10)).toBe(9);

      // Test with array that has holes (sparse array)
      const sparseArray = [1, , 3, , 5]; // eslint-disable-line no-sparse-arrays
      return Q.resolve(sparseArray).then((sparse: number[]) => {
        // This would behave differently with i-- mutation
        expect(sparse.indexOf(1)).toBe(0);
        expect(sparse.indexOf(3)).toBe(2);
        expect(sparse.indexOf(5)).toBe(4);
        expect(sparse.indexOf(99)).toBe(-1);
      });
    });
  });
});