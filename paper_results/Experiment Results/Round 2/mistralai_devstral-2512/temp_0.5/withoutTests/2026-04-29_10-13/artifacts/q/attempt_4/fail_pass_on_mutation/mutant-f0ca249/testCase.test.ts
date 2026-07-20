const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle sparse array in reduce operation", () => {
    // This test targets the mutation in array_reduce where index is decremented instead of incremented
    // The mutation would cause incorrect behavior when processing sparse arrays
    const sparseArray = [1, , 3]; // Sparse array with hole at index 1
    const promise = Q(sparseArray);

    return promise.then((arr: any[]) => {
      // Use Q.all which internally uses array_reduce
      // The original code should handle sparse arrays correctly
      return Q.all(arr.map((item: any) => Q.resolve(item)));
    }).then((result: any) => {
      // Should resolve with [1, undefined, 3] for sparse array
      expect(result.length).toBe(3);
      expect(result[0]).toBe(1);
      expect(result[1]).toBeUndefined();
      expect(result[2]).toBe(3);
    });
  });
});