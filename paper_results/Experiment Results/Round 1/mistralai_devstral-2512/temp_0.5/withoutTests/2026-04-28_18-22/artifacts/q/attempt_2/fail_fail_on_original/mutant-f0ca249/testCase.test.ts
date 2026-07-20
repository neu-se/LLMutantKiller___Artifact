import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce mutation", () => {
  it("should correctly handle sparse arrays in reduce operation", () => {
    // Create a sparse array where the mutation would cause different behavior
    const sparseArray = [1, , 3]; // index 1 is empty

    // Use Q.all which internally uses array_reduce
    return Q.all(sparseArray).then((result) => {
      // The original code should handle this correctly
      // The mutated code with --index would behave differently
      expect(result).toEqual([1, undefined, 3]);
    });
  });
});