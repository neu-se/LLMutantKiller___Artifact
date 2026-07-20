// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-337791e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.exp()', () => {
  it('should return a real number when the imaginary part is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.exp();
    expect(result.im).toBe(0);
    expect(result.re).toBeCloseTo(Math.exp(1));
  });
});