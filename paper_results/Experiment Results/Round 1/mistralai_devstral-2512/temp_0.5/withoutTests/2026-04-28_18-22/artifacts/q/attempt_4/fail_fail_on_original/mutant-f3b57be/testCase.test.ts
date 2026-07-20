// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_4/pending_category/mutant-f3b57be/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim behavior", () => {
  it("should handle array reduce with single argument callback", () => {
    // This test directly targets the array_reduce shim mutation
    // The mutation changes `if (arguments.length === 1)` to `if (false)`
    // which breaks the single-argument reduce behavior
    const testArray = [1, 2, 3, 4];

    // Force using the shim by creating an array without reduce method
    const fakeArray = {
      length: 4,
      0: 1,
      1: 2,
      2: 3,
      3: 4
    };

    // This will use the array_reduce shim implementation
    const result = Q.resolve(fakeArray).then(function(arr: any) {
      // The shim's reduce implementation should handle single argument case
      return Q.Promise(function(resolve) {
        // Directly test the array_reduce shim
        const sum = Q.array_reduce(arr, function(acc: number, val: number) {
          return acc + val;
        });
        resolve(sum);
      });
    });

    return expect(result).resolves.toBe(10);
  });
});