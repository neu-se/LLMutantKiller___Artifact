// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh()", () => {
  it("should not execute the special case for (0,0) when inputs are non-zero", () => {
    // This test will fail on mutated code because the mutation changes
    // "if (a === 0 && b === 0)" to "if (true)", causing all inputs
    // to be treated as the (0,0) special case
    const result = new Complex(1, 1).sinh();

    // For non-zero inputs, we should get the actual sinh calculation
    // not the special case handling for (0,0)
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});