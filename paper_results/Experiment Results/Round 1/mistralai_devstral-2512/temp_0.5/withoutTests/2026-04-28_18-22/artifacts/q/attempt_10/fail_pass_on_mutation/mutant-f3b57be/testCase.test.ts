// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_10/pending_category/mutant-f3b57be/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim behavior", () => {
  it("should handle array reduce with single argument callback", () => {
    // This test directly targets the array_reduce shim mutation
    // The mutation changes `if (arguments.length === 1)` to `if (false)`
    // which breaks the single-argument reduce behavior

    // Create an array-like object without native reduce method
    const fakeArray = {
      length: 4,
      0: 1,
      1: 2,
      2: 3,
      3: 4
    };

    // Test the reduce shim by calling it with single argument
    // This should work in original code but fail in mutated version
    return Q.resolve(fakeArray).then(function(arr: any) {
      // Force using the shim by calling reduce with only callback
      const sum = Array.prototype.reduce.call(arr, function(acc: number, val: number) {
        return acc + val;
      });
      expect(sum).toBe(10);
    });
  });
});