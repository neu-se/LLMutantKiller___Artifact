const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce with single element array", () => {
    // This test targets the specific mutation in array_reduce
    // where ++index was changed to --index in the initial value check
    // We create a scenario that would expose this mutation

    // Create a single element array that will trigger the reduce path
    const singleElementArray = [42];

    // Use Q.all which internally uses array_reduce
    // The mutation would cause incorrect index handling
    return Q.all(singleElementArray).then((result: any) => {
      // Verify the exact result
      expect(result).toEqual([42]);
    });
  });
});