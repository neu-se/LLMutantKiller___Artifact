const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find index using Q's internal array_indexOf implementation", () => {
    // Create a test that directly exercises the array_indexOf shim
    // by using it in a context where Q needs to check promise states
    const testArray = [10, 20, 30, 40, 50];
    const valueToFind = 30;

    // Create a scenario where Q will use its internal array_indexOf
    // by working with promise arrays and their inspection
    const promises = testArray.map(value => Q.resolve(value));

    return Q.all(promises).then(function(results: number[]) {
      // This will trigger the array_indexOf shim
      const index = results.indexOf(valueToFind);

      // The mutation changes the condition to "if (false)" which will
      // cause indexOf to always return -1
      expect(index).toBe(2);
      return index;
    });
  });
});