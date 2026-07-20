// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7fd73bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.log()', () => {
  it('should return correct result for negative real numbers with zero imaginary part', () => {
    const result = new Complex(-5, 0).log();
    expect(result.re).toBeCloseTo(Math.log(5), 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});