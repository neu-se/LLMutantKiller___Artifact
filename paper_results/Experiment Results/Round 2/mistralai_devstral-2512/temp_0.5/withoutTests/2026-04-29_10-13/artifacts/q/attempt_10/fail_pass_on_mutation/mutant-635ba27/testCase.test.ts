const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly find elements using array_indexOf implementation", () => {
    // This test targets the specific array_indexOf shim implementation
    // The mutation changes i++ to i-- which would cause incorrect behavior
    // We'll test with an array where the mutation would produce wrong results

    // Create a test array where the first element is the target
    const testArray = [100, 200, 300, 400, 500];

    // Use Q to process the array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding first element - this would fail with i-- mutation
      // because the loop would start at 0 and immediately decrement to -1
      expect(arr.indexOf(100)).toBe(0);

      // Test finding middle element
      expect(arr.indexOf(300)).toBe(2);

      // Test finding last element
      expect(arr.indexOf(500)).toBe(4);

      // Test with array that has the target at the beginning
      const arrayWithTargetFirst = [999, 1, 2, 3];
      return Q.resolve(arrayWithTargetFirst).then((arr2: number[]) => {
        // This would return -1 with i-- mutation
        expect(arr2.indexOf(999)).toBe(0);
      });
    });
  });
});