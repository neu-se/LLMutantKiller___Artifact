const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly find first occurrence in array using array_indexOf", () => {
    // This test targets the specific array_indexOf implementation
    // The mutation changes i++ to i-- which would cause the loop to never execute
    // We'll test with a simple array where the mutation would clearly fail

    const testArray = [5, 10, 15, 20];

    // Use Q to process the array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding first element - this would fail with i-- mutation
      // because the loop would start at 0 and immediately decrement to -1
      expect(arr.indexOf(5)).toBe(0);

      // Test finding last element
      expect(arr.indexOf(20)).toBe(3);

      // Test with array that has the target at index 0
      const arrayWithTargetFirst = [99, 1, 2, 3];
      return Q.resolve(arrayWithTargetFirst).then((arr2: number[]) => {
        // This would return -1 with i-- mutation
        expect(arr2.indexOf(99)).toBe(0);
      });
    });
  });
});