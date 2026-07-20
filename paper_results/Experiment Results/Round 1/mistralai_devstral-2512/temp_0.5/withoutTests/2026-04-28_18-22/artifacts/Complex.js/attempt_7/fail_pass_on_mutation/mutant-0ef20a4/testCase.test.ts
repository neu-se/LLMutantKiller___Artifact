// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ef20a4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex inverse method', () => {
  it('should return Infinity for zero input', () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});