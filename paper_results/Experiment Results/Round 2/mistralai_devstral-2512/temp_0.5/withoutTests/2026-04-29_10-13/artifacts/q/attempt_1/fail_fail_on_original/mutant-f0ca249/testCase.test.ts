import { Q } from "./q";

describe("Q library array_reduce mutation", () => {
  it("should correctly handle empty array in reduce operation", () => {
    // This test targets the mutation in array_reduce where index is decremented instead of incremented
    // The mutation would cause an infinite loop when checking empty arrays
    const promise = Q.resolve([]);

    return promise.then((arr: any[]) => {
      // The array_reduce function is used internally by Q
      // We trigger it by creating a scenario that would use it
      // For an empty array, the original code should throw TypeError
      // The mutated code would infinite loop (decrementing index below 0)
      return Q.all(arr.map((item) => Q.resolve(item)));
    }).then(
      () => {
        // Should not reach here for empty array
        throw new Error("Expected TypeError for empty array");
      },
      (error) => {
        // Original code throws TypeError for empty array
        // Mutated code would hang/infinite loop
        expect(error).toBeInstanceOf(TypeError);
      }
    );
  });
});