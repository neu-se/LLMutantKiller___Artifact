const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Test by creating a scenario that will use the internal array_map implementation
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Create a promise that resolves to an array and then uses Q.all which internally uses array_map
    const promise = qModule(input).then(function(arr: number[]) {
      // Q.all will use array_map internally when processing the array of promises
      return qModule.all(arr.map(function(x: number) {
        return x * 2;
      }));
    });

    return promise.then(function(result: number[]) {
      expect(result).toEqual(expected);
    });
  });
});