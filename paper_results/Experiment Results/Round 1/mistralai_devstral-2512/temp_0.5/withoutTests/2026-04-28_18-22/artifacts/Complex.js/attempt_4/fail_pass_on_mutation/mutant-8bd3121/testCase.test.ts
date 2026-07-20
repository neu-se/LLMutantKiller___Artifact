// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should correctly compute asech for a complex number with non-zero imaginary part', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // This will cause the calculation to fail when trying to access undefined property
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
  });
});