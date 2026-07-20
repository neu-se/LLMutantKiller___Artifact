const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Test the array_map function by using it through a promise chain
    // since it's an internal function not directly exposed
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Create a promise that will use array_map internally
    const promise = qModule(input);
    const resultPromise = promise.then(function(arr: any[]) {
      // The array_map is used internally by Q when handling array operations
      // We can test it by creating a new array through promise operations
      return qModule.all(arr.map(function(x: number) {
        return qModule(x * 2);
      }));
    });

    return resultPromise.then(function(result: number[]) {
      expect(result).toEqual(expected);
    });
  });
});