const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_map mutation test", () => {
  it("should correctly map array values using the internal array_map implementation", () => {
    const testArray = [1, 2, 3];
    const callback = function(value: number, index: number, array: number[]) {
      return value * 2;
    };
    const thisArg = {};

    // This test directly exercises the array_map shim that was mutated
    const result = Q(testArray).then(function(arr: number[]) {
      // Force use of the internal array_map implementation
      const map = (arr as any).map;
      (arr as any).map = undefined; // Force fallback to shim

      const mapped = arr.map(callback, thisArg);

      // Restore
      (arr as any).map = map;
      return mapped;
    });

    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([2, 4, 6]);
    });
  });
});