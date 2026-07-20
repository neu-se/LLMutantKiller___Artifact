// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-258e6eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.atanh', () => {
  it('should correctly handle the sign of imaginary part for complex numbers with real part > 1', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    // The mutation changes `if (noIM)` to `if (true)`, which would incorrectly negate the imaginary part
    // For x > 1, atanh(x) should return a complex number with imaginary part = -π/2
    // The mutation would make it positive π/2
    expect(result.im).toBeLessThan(0);
  });
});