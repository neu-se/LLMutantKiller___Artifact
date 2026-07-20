const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle empty sparse arrays in reduce operation", () => {
    // Create a sparse array that will trigger the mutation
    // The mutation changes ++index to --index in the reduce operation
    // This will cause different behavior when checking array bounds
    const sparseArray = Array(3); // Creates [empty × 3]

    // Use Q.all which internally uses array_reduce
    // The mutation would cause an infinite loop or incorrect index handling
    return Q.all(sparseArray).then((result: any) => {
      // The original code should handle this correctly
      // The mutated code with --index would fail or behave differently
      expect(result).toEqual([undefined, undefined, undefined]);
    });
  });
});