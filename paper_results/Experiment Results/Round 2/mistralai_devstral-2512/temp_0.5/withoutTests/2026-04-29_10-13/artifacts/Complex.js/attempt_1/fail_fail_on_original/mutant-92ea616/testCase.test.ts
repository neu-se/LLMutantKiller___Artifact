// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acot', () => {
  it('should correctly handle non-zero complex numbers', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(-0.5535743588970451, 10);
  });
});