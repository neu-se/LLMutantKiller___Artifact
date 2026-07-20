// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a97afda/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should handle the special case when b === 1 differently from other cases", () => {
    const c1 = new Complex(0, 1);
    const result1 = c1.atan();

    const c2 = new Complex(0, 1.0000001); // Slightly different from 1
    const result2 = c2.atan();

    // The original code has special handling for b === 1 that should produce different results
    // The mutant removes this special case, so results should be the same
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
    expect(result1.im).not.toBeCloseTo(result2.im, 10);
  });
});