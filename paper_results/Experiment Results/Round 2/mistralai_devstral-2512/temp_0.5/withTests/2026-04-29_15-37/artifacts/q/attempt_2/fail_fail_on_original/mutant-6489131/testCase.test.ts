const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce", () => {
    // Create a sparse array where the first element is missing
    const sparseArray = [, 2, 3]; // index 0 is empty

    // Test the array_reduce function directly
    const result = Q.array_reduce(sparseArray, (callback: any, basis: any) => {
      return basis;
    }, 0);

    // The original code should find index 1 as the first present index
    // and return 2 (the value at index 1)
    // The mutated code would get stuck in an infinite loop
    expect(result).toBe(2);
  });
});