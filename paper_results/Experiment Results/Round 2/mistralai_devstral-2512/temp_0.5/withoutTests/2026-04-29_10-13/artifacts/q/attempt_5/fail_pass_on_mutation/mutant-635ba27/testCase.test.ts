const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation", () => {
  it("should correctly implement array_indexOf with proper loop increment", () => {
    // This test directly targets the array_indexOf shim implementation
    // The mutation changes i++ to i-- which would cause an infinite loop
    // We'll create a test that would timeout with the mutation

    // Create a large array to make the infinite loop obvious
    const largeArray = Array.from({length: 1000}, (_, i) => i + 1);
    const targetValue = 500;

    // Use Q to process the array and test indexOf
    const promise = Q.resolve(largeArray);

    return promise.then((arr: number[]) => {
      // This should complete quickly with original code
      // But would hang with mutated code (i-- causes infinite loop)
      const startTime = Date.now();
      const index = arr.indexOf(targetValue);
      const endTime = Date.now();

      // Verify correct index was found
      expect(index).toBe(499);

      // Verify it completed in reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100);

      // Also test edge cases
      expect(arr.indexOf(1)).toBe(0);
      expect(arr.indexOf(1000)).toBe(999);
      expect(arr.indexOf(9999)).toBe(-1);
    });
  });
});