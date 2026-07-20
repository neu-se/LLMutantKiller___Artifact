const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly process array with single undefined element", () => {
    // This test targets the mutation in array_reduce where index is decremented
    // The mutation would cause incorrect behavior when checking array bounds
    const arrayWithUndefined = [undefined];
    const promise = Q(arrayWithUndefined);

    return promise.then((arr: any[]) => {
      // Use spread which internally uses array_reduce
      return Q.spread(arr, (first: any) => {
        return Q.resolve(first);
      });
    }).then((result: any) => {
      // Should resolve with undefined
      expect(result).toBeUndefined();
    });
  });
});