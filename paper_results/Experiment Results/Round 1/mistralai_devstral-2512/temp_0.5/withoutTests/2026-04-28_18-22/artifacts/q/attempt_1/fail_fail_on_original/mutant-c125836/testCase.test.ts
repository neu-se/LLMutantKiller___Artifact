import { Q } from "./q.js";

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with initial value", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which would break the reduce behavior when initial value is provided

    // Create a mock array-like object with reduce method
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
      reduce: function(callback, initialValue) {
        let accumulator = initialValue;
        for (let i = 0; i < this.length; i++) {
          accumulator = callback(accumulator, this[i], i);
        }
        return accumulator;
      }
    };

    // Test with initial value - this should work in original but fail in mutated
    const result = Q(arrayLike).then(function(arr) {
      return arr.reduce(function(acc, val) {
        return acc + val;
      }, 10); // initial value of 10
    });

    return result.then(function(sum) {
      expect(sum).toBe(16); // 10 + 1 + 2 + 3 = 16
    });
  });
});