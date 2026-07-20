// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c8c916d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc()', () => {
  it('should correctly handle non-zero real part when imaginary part is zero', () => {
    const result = new Complex(0.5, 0).acsc();
    const expectedRe = Math.log(1 + Math.sqrt(1 + 0.25));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBe(0);
  });
});