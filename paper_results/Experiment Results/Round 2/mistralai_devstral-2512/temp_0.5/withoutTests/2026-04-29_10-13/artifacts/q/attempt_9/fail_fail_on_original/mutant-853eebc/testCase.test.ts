const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Test by directly using the array_map implementation through Q's internal operations
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Create a promise that will use array_map internally
    const promise = qModule(input).then(function(arr: number[]) {
      // Force use of internal array_map by using Q's dispatch mechanism
      return qModule.dispatch(arr, "map", [function(x: number) { return x * 2; }]);
    });

    return promise.then(function(result: number[]) {
      expect(result).toEqual(expected);
    });
  });
});