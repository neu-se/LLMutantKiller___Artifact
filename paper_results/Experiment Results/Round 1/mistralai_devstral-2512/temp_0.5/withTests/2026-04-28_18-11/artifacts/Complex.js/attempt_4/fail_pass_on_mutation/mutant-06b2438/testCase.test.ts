// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should correctly compute asinh for a purely real number', () => {
    const c = new Complex(1, 0);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(0);
  });
});