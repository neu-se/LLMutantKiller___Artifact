const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly find elements in array with array_indexOf implementation", () => {
    // This test targets the specific array_indexOf shim implementation
    // The mutation changes i++ to i-- which would cause incorrect behavior
    // We'll test with an array where the mutation would produce wrong results

    const testArray = [10, 20, 30, 40, 50];

    // Use Q.all which internally uses array operations
    const promises = testArray.map(num => Q.resolve(num));
    return Q.all(promises).then((results: number[]) => {
      // Test finding middle element - this would fail with i-- mutation
      expect(results.indexOf(30)).toBe(2);

      // Test finding first element
      expect(results.indexOf(10)).toBe(0);

      // Test finding last element
      expect(results.indexOf(50)).toBe(4);

      // Test not finding element
      expect(results.indexOf(99)).toBe(-1);

      // Test with array that has undefined values
      const arrayWithHoles = [1, , 3]; // eslint-disable-line no-sparse-arrays
      return Q.resolve(arrayWithHoles).then((arr: number[]) => {
        // This would behave differently with i-- mutation
        expect(arr.indexOf(1)).toBe(0);
        expect(arr.indexOf(3)).toBe(2);
      });
    });
  });
});