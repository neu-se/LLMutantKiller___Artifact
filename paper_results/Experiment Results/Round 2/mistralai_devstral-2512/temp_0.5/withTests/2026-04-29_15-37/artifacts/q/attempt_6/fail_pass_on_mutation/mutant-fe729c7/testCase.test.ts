// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in Q.all", () => {
    // Create a sparse array of promises where some indices are missing
    const sparsePromises = [];
    sparsePromises[0] = Q.resolve(1);
    sparsePromises[2] = Q.resolve(3);
    // Index 1 is missing

    // Q.all internally uses array_reduce to process the promises
    return Q.all(sparsePromises).then((results) => {
      // With original code (index in this):
      // Should only process defined promises at indices 0 and 2
      // Result should be [1, undefined, 3] with length 3

      // With mutated code (if true):
      // Would try to process all indices including missing ones
      // This would cause issues with the reduce operation

      expect(results).toEqual([1, undefined, 3]);
      expect(results.length).toBe(3);
    });
  });
});