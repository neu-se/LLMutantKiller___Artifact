// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly skip missing indices in sparse arrays", () => {
    // Create a sparse array where most indices are missing
    const sparseArray = [];
    sparseArray[0] = 1;
    sparseArray[10] = 11;

    // Create a promise that will use array_reduce internally
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Test by creating a promise that resolves to our sparse array
    // and then performs a reduce operation that counts iterations
    return Q(sparseArray).then((arr: any[]) => {
      let iterationCount = 0;
      let lastIndex = -1;

      arr.reduce((sum: number, val: any, index: number) => {
        iterationCount++;
        lastIndex = index;
        return sum + (val || 0);
      }, 0);

      // With original code (index in this):
      // Should only iterate for indices 0 and 10 (2 iterations)
      // lastIndex should be 10

      // With mutated code (if true):
      // Would iterate for all indices 0-10 (11 iterations)
      // lastIndex would be 10 in both cases

      // So we check iteration count
      expect(iterationCount).toBe(2);
    });
  });
});