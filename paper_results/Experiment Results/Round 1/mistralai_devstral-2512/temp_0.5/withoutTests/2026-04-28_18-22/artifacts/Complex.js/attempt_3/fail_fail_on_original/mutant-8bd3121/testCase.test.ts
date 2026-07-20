// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should correctly handle the imaginary part in asech calculation', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // This will cause b to be undefined, which should break the calculation
    expect(result).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    // These values should be different when the mutation is present
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.4636476090008061);
  });
});