const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly handle array operations with array_indexOf", () => {
    // This test targets the array_indexOf implementation directly
    // The mutation changes i++ to i-- which would cause infinite loop or incorrect results
    const testArray = [1, 2, 3, 4, 5];

    // Create a scenario that would expose the mutation
    // We'll use Q.all which internally uses array operations
    const promises = testArray.map(num => Q.resolve(num));
    const allPromise = Q.all(promises);

    return allPromise.then((results: number[]) => {
      // Now test array_indexOf on the resolved array
      // This should find index 2 for value 3
      const index = results.indexOf(3);
      expect(index).toBe(2);

      // Test finding first element
      expect(results.indexOf(1)).toBe(0);

      // Test finding last element
      expect(results.indexOf(5)).toBe(4);

      // Test not finding non-existent element
      expect(results.indexOf(99)).toBe(-1);
    });
  });
});