// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge case", () => {
  it("should handle multiplication of two real numbers correctly", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutation causes an empty if block which would return undefined
    // This test verifies we get a proper Complex object back
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // Additional check to ensure we didn't get undefined
    expect(result).not.toBeUndefined();
  });
});