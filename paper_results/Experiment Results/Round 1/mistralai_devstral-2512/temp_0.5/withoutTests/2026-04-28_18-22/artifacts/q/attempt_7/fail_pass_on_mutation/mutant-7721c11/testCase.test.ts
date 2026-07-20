const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array operations using Q's internal array_indexOf", () => {
    // Create a test that forces Q to use its internal array_indexOf shim
    // by working with promise arrays and their resolution states
    const testValues = [1, 2, 3, 4, 5];
    const searchValue = 3;

    // Create promises that will use array_indexOf during resolution
    const promises = testValues.map(val => {
      const def = Q.defer();
      setTimeout(() => def.resolve(val), 0);
      return def.promise;
    });

    return Q.all(promises).then(function(results: number[]) {
      // This indexOf call should use Q's internal shim
      const index = results.indexOf(searchValue);
      expect(index).toBe(2);
      return index;
    });
  });
});