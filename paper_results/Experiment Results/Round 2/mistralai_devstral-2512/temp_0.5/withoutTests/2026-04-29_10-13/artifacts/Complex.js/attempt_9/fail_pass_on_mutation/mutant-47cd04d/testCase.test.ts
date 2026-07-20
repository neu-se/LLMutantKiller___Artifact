// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.add', () => {
  it('should handle infinite complex numbers correctly in addition', () => {
    const infiniteComplex = Complex.INFINITY;
    const finiteComplex = new Complex(5, 3);
    const result = infiniteComplex.add(finiteComplex);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});