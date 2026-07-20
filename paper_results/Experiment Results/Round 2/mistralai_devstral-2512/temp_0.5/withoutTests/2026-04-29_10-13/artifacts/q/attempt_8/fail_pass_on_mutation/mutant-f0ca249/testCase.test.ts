const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle empty array in allSettled operation", () => {
    // This test targets the mutation in array_reduce where index is decremented
    // The mutation would cause incorrect behavior when processing empty arrays
    const emptyArray: any[] = [];

    return Q(emptyArray).allSettled().then((results: any[]) => {
      // Original code should handle empty arrays correctly
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });
});