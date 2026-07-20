const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce operation on empty arrays", () => {
    // This test specifically targets the mutation in array_reduce
    // where ++index was changed to --index in the initial value check
    // We create a scenario that would trigger the TypeError path

    // Create a promise that will use array_reduce internally
    // The mutation would cause different behavior in the reduce operation
    return Q.all([]).then((result: any) => {
      // The original code should handle empty arrays correctly
      expect(result).toEqual([]);
    });
  });
});