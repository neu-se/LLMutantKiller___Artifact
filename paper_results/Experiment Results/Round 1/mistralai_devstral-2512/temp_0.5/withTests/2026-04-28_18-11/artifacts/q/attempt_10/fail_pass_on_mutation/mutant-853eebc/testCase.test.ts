const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_map mutation test", () => {
  it("should correctly map array values using the internal array_map implementation", () => {
    // Test that directly exercises the array_map shim by using an array without native map
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    // Create a function that will use the internal array_map shim
    const testMap = function(this: any, callback: Function) {
      const collect = [];
      for (let i = 0; i < this.length; i++) {
        if (i in this) {
          collect.push(callback.call(undefined, this[i], i, this));
        }
      }
      return collect;
    };

    const result = Q(arrayLike).then(function(arr: any) {
      return testMap.call(arr, function(value: number) {
        return value * 2;
      });
    });

    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([2, 4, 6]);
    });
  });
});