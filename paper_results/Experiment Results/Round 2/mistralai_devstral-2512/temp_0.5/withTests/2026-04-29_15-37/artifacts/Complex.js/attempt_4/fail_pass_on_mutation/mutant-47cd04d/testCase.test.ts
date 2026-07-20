// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.add', () => {
  it('should return Complex.INFINITY when adding a finite complex number to Complex.INFINITY', () => {
    const finite = new Complex(5, 3);
    const result = finite.add(Complex.INFINITY);
    expect(result.isInfinite()).toBe(true);
    expect(result).toEqual(Complex.INFINITY);
  });
});