const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle empty array in reduce operation", () => {
    // This test targets the mutation in array_reduce where index is decremented instead of incremented
    // The mutation would cause incorrect behavior when processing empty arrays
    const promise = Q([]);

    return promise.then((arr: any[]) => {
      // Use Q.all which internally uses array_reduce
      // For an empty array, this should resolve successfully
      return Q.all(arr);
    }).then((result: any) => {
      // Should resolve with an empty array
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });
});