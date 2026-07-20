// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot function behavior', () => {
  it('should correctly compute hypot when a < b for values just above threshold', () => {
    const a = 3001;
    const b = 4000;
    const c = new Complex(a, b);
    const absValue = c.abs();
    const expected = Math.sqrt(a * a + b * b);
    expect(absValue).toBeCloseTo(expected, 12);
  });
});