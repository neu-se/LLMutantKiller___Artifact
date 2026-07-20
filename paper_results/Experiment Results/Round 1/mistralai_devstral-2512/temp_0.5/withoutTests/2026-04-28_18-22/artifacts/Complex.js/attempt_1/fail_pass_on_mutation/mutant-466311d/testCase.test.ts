// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot', () => {
  it('should correctly compute logHypot for large values', () => {
    const a = 4000;
    const b = 2000;
    const c = new Complex(a, b);
    const result = c.log();
    const expectedRe = Math.log(Math.sqrt(a * a + b * b));
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});