import { Q } from "./q.js";

describe("Q library array_reduce mutation", () => {
  it("should correctly handle empty array in reduce operation", () => {
    // This test targets the mutation in array_reduce where index is decremented instead of incremented
    // The mutation would cause an infinite loop when checking sparse arrays
    const promise = Q.resolve([]);

    return promise.then((arr: any[]) => {
      // The array_reduce function is used internally by Q
      // We trigger it by creating a situation where Q needs to process an array
      // The mutation would cause an infinite loop or incorrect behavior
      return Q.all(arr);
    }).then((result) => {
      expect(result).toEqual([]);
    });
  });
});