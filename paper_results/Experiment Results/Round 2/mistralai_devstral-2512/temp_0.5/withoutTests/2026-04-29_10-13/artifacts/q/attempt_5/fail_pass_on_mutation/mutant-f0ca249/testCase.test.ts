const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array with single element in reduce operation", () => {
    // This test targets the mutation in array_reduce where index is decremented instead of incremented
    // The mutation would cause incorrect behavior when processing arrays with one element
    const singleElementArray = [42];
    const promise = Q(singleElementArray);

    return promise.then((arr: any[]) => {
      // Use Q.all which internally uses array_reduce
      // The original code should handle single element arrays correctly
      return Q.all(arr);
    }).then((result: any) => {
      // Should resolve with [42]
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0]).toBe(42);
    });
  });
});