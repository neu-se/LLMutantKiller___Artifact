const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_map mutation test", () => {
  it("should correctly map values using array_map with context", () => {
    const input = [1, 2, 3];
    const context = { multiplier: 2 };
    const callback = function(this: typeof context, value: number) {
      return value * this.multiplier;
    };
    const result = Q(input).then(function(arr: number[]) {
      return arr.map(callback, context);
    });
    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([2, 4, 6]);
    });
  });
});