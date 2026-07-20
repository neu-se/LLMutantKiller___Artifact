const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle sparse arrays correctly in reduce", () => {
    // Create a sparse array where we'll test the reduce behavior
    const sparseArray = [1, , 3]; // index 1 is empty

    // This should work fine with the original code but might behave differently with the mutation
    return Q.all(sparseArray).then((result: any) => {
      // The mutation removes the TypeError throw, so this test verifies the correct handling
      expect(result).toEqual([1, undefined, 3]);
    });
  });
});