// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ef20a4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex inverse method', () => {
  it('should handle zero input by returning Complex.INFINITY', () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result).toEqual(Complex.INFINITY);
  });
});