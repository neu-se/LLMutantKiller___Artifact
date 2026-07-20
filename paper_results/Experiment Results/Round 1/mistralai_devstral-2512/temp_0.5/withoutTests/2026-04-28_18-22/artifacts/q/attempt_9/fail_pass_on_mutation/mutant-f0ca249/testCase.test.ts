const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce with sparse array and no initial value", () => {
    // This test targets the specific mutation in array_reduce
    // where ++index was changed to --index in the initial value check
    // We create a sparse array that will trigger the TypeError path

    // Create a sparse array where first element is missing
    const sparseArray = [, 2, 3]; // index 0 is empty

    // Use Q.all which internally uses array_reduce without initial value
    // The mutation would cause infinite loop when checking for first value
    return Q.all(sparseArray).then((result: any) => {
      // The original code should handle this correctly
      expect(result).toEqual([undefined, 2, 3]);
    });
  });
});