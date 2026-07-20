// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should produce correct results for asinh calculation', () => {
    const c = new Complex(0, 1); // Purely imaginary number
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 4);
  });
});