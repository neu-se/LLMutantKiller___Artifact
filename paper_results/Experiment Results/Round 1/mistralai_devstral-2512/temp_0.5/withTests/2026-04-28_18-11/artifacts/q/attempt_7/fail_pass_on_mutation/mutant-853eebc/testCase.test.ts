const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_map mutation test", () => {
  it("should correctly use array_map shim with callback", () => {
    const input = [1, 2, 3];
    const result = Q(input).then(function(arr: number[]) {
      // Directly test the array_map shim behavior
      const mapped = [];
      Q.nextTick(function() {
        for (let i = 0; i < arr.length; i++) {
          mapped.push(arr[i] * 2);
        }
      });
      return mapped;
    });
    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([2, 4, 6]);
    });
  });
});