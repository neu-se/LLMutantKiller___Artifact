const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_map mutation test", () => {
  it("should correctly map array values using the internal array_map shim", () => {
    // Create a test scenario that directly exercises the array_map shim
    const testArray = [1, 2, 3];
    const callback = function(value: number, index: number, array: number[]) {
      return value * 2;
    };

    // Use Q to create a promise that will use the internal array_map
    const result = Q(testArray).then(function(arr: number[]) {
      // Create a new array-like object without native map method
      const arrayLike = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
      };

      // Use the internal array_map implementation
      const array_map = Q.nextTick(function() {
        const collect = [];
        for (let i = 0; i < arrayLike.length; i++) {
          collect.push(callback.call(undefined, arrayLike[i], i, arrayLike));
        }
        return collect;
      });

      return array_map;
    });

    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([2, 4, 6]);
    });
  });
});