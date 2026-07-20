// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.add', () => {
  it('should correctly handle addition of finite and infinite complex numbers', () => {
    const finiteComplex = new Complex(1, 2);
    const infiniteComplex = Complex.INFINITY;
    const result = finiteComplex.add(infiniteComplex);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});