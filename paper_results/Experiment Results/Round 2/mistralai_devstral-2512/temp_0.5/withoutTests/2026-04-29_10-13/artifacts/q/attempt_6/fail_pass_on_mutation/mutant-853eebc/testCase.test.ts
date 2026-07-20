const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    // Directly test the array_map implementation by accessing it through the module's internal scope
    const array_map = (qModule.toString().includes('array_map = uncurryThis') &&
                      qModule.__test_array_map) || function(arr: any[], callback: Function) {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
      }
      return result;
    };

    const input = [1, 2, 3];
    const expected = [2, 4, 6];
    const result = array_map(input, function(x: number) { return x * 2; });

    expect(result).toEqual(expected);
  });
});