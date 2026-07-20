// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech', () => {
  it('should return correct result for complex number with zero real part', () => {
    const c = new Complex(0, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI/2, 10);
  });
});