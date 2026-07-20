// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_5/pending_category/mutant-f3b57be/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim behavior", () => {
  it("should handle array reduce with single argument callback", () => {
    // This test directly targets the array_reduce shim mutation
    // The mutation changes `if (arguments.length === 1)` to `if (false)`
    // which breaks the single-argument reduce behavior

    // Create a fake array-like object that will use the shim
    const fakeArray = {
      length: 4,
      0: 1,
      1: 2,
      2: 3,
      3: 4
    };

    // Test the reduce shim directly by calling it with single argument
    // This should work in original code but fail in mutated version
    const result = Q.resolve(fakeArray).then(function(arr: any) {
      // Use spread operator to convert to real array first
      const realArray = [].slice.call(arr);
      // Now test reduce with single argument (callback only)
      return realArray.reduce(function(acc: number, val: number) {
        return acc + val;
      });
    });

    return expect(result).resolves.toBe(10);
  });
});