// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.add', () => {
  it('should return Complex.INFINITY when adding Complex.INFINITY to a finite complex number', () => {
    const finite = new Complex(2, 3);
    const result = Complex.INFINITY.add(finite);
    expect(result).toEqual(Complex.INFINITY);
  });
});