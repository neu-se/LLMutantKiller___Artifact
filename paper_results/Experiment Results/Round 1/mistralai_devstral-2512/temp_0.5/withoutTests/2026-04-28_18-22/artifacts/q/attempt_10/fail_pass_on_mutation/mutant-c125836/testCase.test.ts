const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce callback being called with proper arguments", () => {
    // This test targets the array_reduce shim mutation
    // The mutation changes "if (arguments.length === 1)" to "if (true)"
    // which affects how the reduce operation determines when to search for initial value

    const testArray = [1, 2, 3];
    let callbackCalls = 0;
    let firstCallAccumulator: any = null;

    // Test reduce with initial value - track callback arguments
    const result = Q(testArray).then(function(arr: number[]) {
      return arr.reduce(function(accumulator: number, currentValue: number, index: number) {
        callbackCalls++;
        if (callbackCalls === 1) {
          firstCallAccumulator = accumulator;
        }
        return accumulator + currentValue;
      }, 10); // initial value of 10
    });

    return result.then(function(sum: number) {
      // Original: first call should have accumulator = 10 (initial value)
      // Mutated: first call might have different accumulator due to broken logic
      expect(firstCallAccumulator).toBe(10);
      expect(sum).toBe(16); // 10 + 1 + 2 + 3
    });
  });
});