const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce with initial value on sparse arrays", () => {
    // This test targets the specific mutation in array_reduce
    // where ++index was changed to --index in the initial value check
    // We create a scenario that would expose this mutation

    // Create a sparse array where we know the exact indices
    const sparseArray = [1, , 3]; // index 1 is empty

    // Use Q.all which internally uses array_reduce with initial value
    // The mutation would cause incorrect index handling
    return Q.all(sparseArray).then((result: any) => {
      // Verify the exact structure including undefined for missing elements
      expect(result).toHaveLength(3);
      expect(result[0]).toBe(1);
      expect(result[1]).toBeUndefined();
      expect(result[2]).toBe(3);
    });
  });
});