// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-f3b57be/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim behavior", () => {
  it("should handle single argument reduce correctly", () => {
    // This test targets the array_reduce shim which has a mutation in the condition
    // checking for single argument case. The mutation changes `if (arguments.length === 1)`
    // to `if (false)`, which breaks the single-argument reduce behavior.
    return Q.resolve([1, 2, 3, 4]).then((arr: number[]) => {
      // Using reduce with just a callback (single argument)
      // This should work in the original code but fail in the mutated version
      const result = arr.reduce((acc: number, val: number) => acc + val);
      expect(result).toBe(10);
    });
  });
});