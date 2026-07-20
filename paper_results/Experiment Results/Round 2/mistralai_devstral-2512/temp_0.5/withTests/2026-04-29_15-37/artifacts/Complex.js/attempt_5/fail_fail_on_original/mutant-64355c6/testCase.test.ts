// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should correctly handle non-zero real and imaginary components', () => {
    const result = new Complex(1, 1).asec();
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeCloseTo(0.443, 3);
    expect(result.im).toBeCloseTo(-0.380, 3);
  });
});