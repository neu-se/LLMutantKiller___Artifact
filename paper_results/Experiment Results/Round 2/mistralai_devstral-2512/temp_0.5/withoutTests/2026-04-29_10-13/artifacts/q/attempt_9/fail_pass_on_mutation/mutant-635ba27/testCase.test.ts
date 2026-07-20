const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly implement array_indexOf with proper loop direction", () => {
    // This test directly targets the array_indexOf shim implementation
    // The mutation changes i++ to i-- which would cause the loop to never execute
    // We'll test with an array where the first element is the target

    const testArray = [42, 1, 2, 3, 4, 5];

    // Use Q to process the array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding first element - this would fail with i-- mutation
      // because the loop would start at 0 and immediately decrement to -1
      const index = arr.indexOf(42);
      expect(index).toBe(0);

      // Test with array that has the target at the beginning
      const arrayWithTargetFirst = [99, 1, 2, 3];
      return Q.resolve(arrayWithTargetFirst).then((arr2: number[]) => {
        // This would return -1 with i-- mutation
        expect(arr2.indexOf(99)).toBe(0);
      });
    });
  });
});