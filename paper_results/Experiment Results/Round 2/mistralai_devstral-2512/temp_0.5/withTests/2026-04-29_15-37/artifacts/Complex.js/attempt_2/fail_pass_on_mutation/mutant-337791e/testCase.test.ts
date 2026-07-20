// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-337791e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.exp()', () => {
  it('should return a complex number with non-zero imaginary part when the imaginary part is non-zero', () => {
    const complex = new Complex(0, Math.PI / 2);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });
});