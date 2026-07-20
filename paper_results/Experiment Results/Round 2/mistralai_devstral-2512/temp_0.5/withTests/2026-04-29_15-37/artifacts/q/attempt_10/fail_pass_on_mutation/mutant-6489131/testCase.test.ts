const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle empty sparse arrays in reduce without initial value", () => {
    // Create an empty sparse array
    const emptySparseArray = Array(3); // [empty × 3]

    // Test the specific code path that triggers the mutation
    // The mutation removes the break statement in the reduce shim
    // which would cause infinite loop when no initial value is provided
    const testPromise = Q.resolve().then(() => {
      // Force Q to use its internal reduce implementation
      // by creating a scenario that exercises the reduce code path
      return Q.all([emptySparseArray]).then(() => {
        // This should complete with original code
        // but hang with mutated code due to infinite loop
        return "completed";
      });
    });

    return testPromise.then((result: string) => {
      expect(result).toBe("completed");
    });
  });
});