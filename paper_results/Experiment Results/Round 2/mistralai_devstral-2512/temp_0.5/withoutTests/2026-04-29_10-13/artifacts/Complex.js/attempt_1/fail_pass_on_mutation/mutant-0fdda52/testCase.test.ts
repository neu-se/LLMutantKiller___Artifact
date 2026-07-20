// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot function behavior', () => {
  it('should correctly compute hypot for large values where a >= b', () => {
    const a = 4000;
    const b = 3000;
    const c = new Complex(a, b);
    const absValue = c.abs();
    const expected = Math.sqrt(a * a + b * b);
    expect(absValue).toBeCloseTo(expected, 10);
  });
});