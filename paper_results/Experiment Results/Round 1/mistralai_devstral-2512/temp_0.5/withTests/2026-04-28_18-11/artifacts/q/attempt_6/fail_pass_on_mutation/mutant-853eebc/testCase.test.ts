const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_map mutation test", () => {
  it("should correctly map values using array_map with index and array parameters", () => {
    const input = [1, 2, 3];
    const result = Q(input).then(function(arr: number[]) {
      return arr.map(function(value: number, index: number, array: number[]) {
        return value + index + array.length;
      });
    });
    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([1+0+3, 2+1+3, 3+2+3]);
    });
  });
});