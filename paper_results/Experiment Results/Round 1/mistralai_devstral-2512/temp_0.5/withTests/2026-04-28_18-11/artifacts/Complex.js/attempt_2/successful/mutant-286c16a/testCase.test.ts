// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-286c16a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh', () => {
  it('should return a Complex object when called', () => {
    const z = new Complex(1, 1);
    const result = z.asinh();
    expect(result).toBeInstanceOf(Complex);
  });
});