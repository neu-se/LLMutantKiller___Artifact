// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot method', () => {
  it('should correctly handle complex numbers where d is not zero', () => {
    const c = new Complex(2, 1);
    const result = c.acot();
    // The mutation changes (d !== 0) to (d === 0)
    // For (2,1), d = 2*2 + 1*1 = 5 (not zero)
    // Original code should take first branch, mutated code would take second branch
    // This should produce different results
    expect(result.re).toBeCloseTo(0.4576032347, 6);
    expect(result.im).toBeCloseTo(-0.2237750519, 6);
  });
});