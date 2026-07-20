// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should correctly compute asinh for a complex number and verify the result is not NaN', () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation calls this[""]() which returns undefined
    // When undefined is used in calculations, it should produce NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Also verify the actual values are correct
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.6662394324925153);
  });
});