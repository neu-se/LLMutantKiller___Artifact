const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle empty sparse arrays in reduce", () => {
    // Create an empty sparse array
    const emptySparseArray = Array(3); // [empty × 3]

    // Test the reduce operation that would trigger the mutation
    // The mutation removes the break statement, causing infinite loop
    const testPromise = Q.resolve(emptySparseArray).then((arr: any[]) => {
      // Force Q to use its internal reduce implementation
      return Q.all(arr).then(() => {
        // This should complete successfully with original code
        // but hang with mutated code due to infinite loop
        return "completed";
      });
    });

    return testPromise.then((result: string) => {
      expect(result).toBe("completed");
    });
  });
});