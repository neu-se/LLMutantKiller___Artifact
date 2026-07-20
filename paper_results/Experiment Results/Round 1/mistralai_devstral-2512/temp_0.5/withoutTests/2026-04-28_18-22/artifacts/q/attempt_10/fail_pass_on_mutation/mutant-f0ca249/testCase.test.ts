const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce operation on array with only empty slots", () => {
    // This test targets the specific mutation in array_reduce
    // where ++index was changed to --index in the initial value check
    // We create an array with only empty slots to trigger the TypeError path

    // Create an array with only empty slots
    const emptySlotsArray = Array(3); // [empty × 3]

    // Use Q.all which internally uses array_reduce
    // The mutation would cause infinite loop when checking for first value
    return Q.all(emptySlotsArray).then((result: any) => {
      // The original code should handle this correctly
      expect(result).toEqual([undefined, undefined, undefined]);
    });
  });
});