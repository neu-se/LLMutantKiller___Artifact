// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-258e6eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.atanh', () => {
  it('should correctly compute atanh for a complex number with real part > 1 and imaginary part = 0', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    // For x > 1, atanh(x) should return a complex number with real part = 0 and imaginary part = π/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});