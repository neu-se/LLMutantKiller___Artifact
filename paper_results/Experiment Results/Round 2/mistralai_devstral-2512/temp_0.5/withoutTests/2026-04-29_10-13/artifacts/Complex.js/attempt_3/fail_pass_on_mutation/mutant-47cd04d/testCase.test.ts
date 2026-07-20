// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.add', () => {
  it('should return NaN when adding two infinite complex numbers', () => {
    const infiniteComplex = Complex.INFINITY;
    const result = infiniteComplex.add(infiniteComplex);
    expect(result.isNaN()).toBe(true);
  });
});