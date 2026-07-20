// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-94e2e3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.pow() edge case', () => {
  it('should return Complex.ZERO when raising 0 to a positive real exponent with zero imaginary part', () => {
    const result = new Complex(0, 0).pow(2, 0);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});