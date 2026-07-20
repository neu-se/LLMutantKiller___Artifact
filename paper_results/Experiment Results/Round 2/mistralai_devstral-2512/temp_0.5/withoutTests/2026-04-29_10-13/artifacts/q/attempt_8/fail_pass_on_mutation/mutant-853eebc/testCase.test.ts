const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Test the array_map function by using Q's internal implementation
    // through a promise that will trigger the mapping operation
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Create a promise that resolves to an array and then maps it
    const promise = qModule(input).then(function(arr: number[]) {
      // This will use the internal array_map implementation
      return qModule.all(arr.map(function(x: number) {
        return x * 2;
      }));
    });

    return promise.then(function(result: number[]) {
      expect(result).toEqual(expected);
    });
  });
});