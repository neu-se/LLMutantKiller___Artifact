// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should fail when imaginary part is not properly accessed', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // This will cause the calculation to use undefined instead of the imaginary part
    // The original should produce specific values while the mutant will produce NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // These specific values should only match the original implementation
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(-0.9045568943023813, 10);
  });
});