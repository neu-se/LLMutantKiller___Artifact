import { Q } from "./q.js";

describe("Q library array_map shim", () => {
  it("should correctly map array elements using the callback function", () => {
    const input = [1, 2, 3];
    const expected = [2, 4, 6];

    // Use Q to create a promise that resolves with the mapped array
    const resultPromise = Q(input).then(function(arr) {
      // Use the internal array_map implementation through the promise's dispatch mechanism
      return Q.dispatch(arr, "map", [function(x: number) { return x * 2; }]);
    });

    return resultPromise.then(function(result: number[]) {
      expect(result).toEqual(expected);
    });
  });
});