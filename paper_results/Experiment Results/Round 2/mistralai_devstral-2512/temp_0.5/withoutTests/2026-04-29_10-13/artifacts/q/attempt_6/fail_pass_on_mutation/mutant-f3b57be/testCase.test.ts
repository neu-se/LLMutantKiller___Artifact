const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should handle single argument case in reduce shim", () => {
    // Create a sparse array to test the shim's behavior
    const sparseArray = [1, , 3]; // Note the hole at index 1

    // Force use of the shim by temporarily removing Array.prototype.reduce
    const originalReduce = Array.prototype.reduce;
    delete Array.prototype.reduce;

    try {
      // The shim should handle sparse arrays correctly
      // With the mutation, the single-argument check is disabled, which affects sparse array handling
      const result = Q(sparseArray).then(function(arr: any) {
        return Array.prototype.reduce.call(arr, function(acc: number, val: number) {
          return acc + val;
        });
      });

      return result.then(function(sum: number) {
        // Original code should handle sparse arrays and return 4 (1 + 3)
        // Mutated code may fail or return incorrect result
        expect(sum).toBe(4);
      });
    } finally {
      // Restore the original reduce
      Array.prototype.reduce = originalReduce;
    }
  });
});