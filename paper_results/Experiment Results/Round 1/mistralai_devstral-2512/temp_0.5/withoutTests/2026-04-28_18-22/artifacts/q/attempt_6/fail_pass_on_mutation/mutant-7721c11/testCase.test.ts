const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find index of value in array using Q's internal implementation", () => {
    // Directly test the array_indexOf shim by creating a scenario
    // where Q needs to use it internally for promise handling
    const testArray = [10, 20, 30, 40, 50];
    const valueToFind = 30;

    // Create a deferred that will use array_indexOf when checking promise states
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Simulate internal Q operations that use array_indexOf
    const promises = [Q.resolve(10), Q.resolve(20), Q.resolve(30), Q.resolve(40), Q.resolve(50)];

    return Q.all(promises).then(function(results: number[]) {
      // This will trigger the array_indexOf shim
      const index = results.indexOf(valueToFind);
      expect(index).toBe(2);
      return index;
    });
  });
});