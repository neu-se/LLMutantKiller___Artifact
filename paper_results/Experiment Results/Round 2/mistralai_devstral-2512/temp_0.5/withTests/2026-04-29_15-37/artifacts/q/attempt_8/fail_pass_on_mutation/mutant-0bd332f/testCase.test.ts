const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle sparse array with empty first slot", () => {
    // Create a sparse array where first slot is empty
    const sparseArray = [, 1, 2]; // index 0 is empty

    // This should trigger the reduce implementation
    // Original code should handle this without throwing TypeError
    // Mutated code might behave differently
    return Q.all(sparseArray).then((result: any) => {
      // The result should contain undefined for empty slots
      expect(result[0]).toBeUndefined();
      expect(result[1]).toBe(1);
      expect(result[2]).toBe(2);
    });
  });
});