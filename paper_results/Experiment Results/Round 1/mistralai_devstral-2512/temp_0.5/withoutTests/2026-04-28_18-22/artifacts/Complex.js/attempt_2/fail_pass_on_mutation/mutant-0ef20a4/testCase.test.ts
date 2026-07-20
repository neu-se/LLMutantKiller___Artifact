// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ef20a4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex inverse method', () => {
  it('should return the correct inverse for non-zero complex numbers', () => {
    const c = new Complex(2, 3);
    const result = c.inverse();
    const expected = new Complex(2/13, -3/13);
    expect(result.equals(expected)).toBe(true);
  });
});