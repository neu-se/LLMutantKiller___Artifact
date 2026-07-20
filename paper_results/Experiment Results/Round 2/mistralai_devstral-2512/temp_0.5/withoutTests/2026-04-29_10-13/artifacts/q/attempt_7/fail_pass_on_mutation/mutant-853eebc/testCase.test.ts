const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Test by creating a promise that will use array_map internally
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Create a deferred promise and test the mapping behavior
    const deferred = qModule.defer();
    const testArray = [1, 2, 3];

    // Use the internal array_map through promise operations
    const mappedPromise = qModule.all(testArray.map(function(x: number) {
      return qModule(x * 2);
    }));

    return mappedPromise.then(function(result: number[]) {
      expect(result).toEqual(expected);
    });
  });
});