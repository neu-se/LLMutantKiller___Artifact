// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot function behavior', () => {
  it('should correctly compute hypot when a < b for extremely large values', () => {
    const a = 1000;
    const b = 10000;
    const c = new Complex(a, b);
    const absValue = c.abs();
    const expected = b * Math.sqrt(1 + (a / b) * (a / b));
    expect(absValue).toBeCloseTo(expected, 10);
  });
});