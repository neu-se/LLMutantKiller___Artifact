// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f3a721f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.equals()', () => {
  it('should return true when comparing two numbers with a difference exactly equal to EPSILON', () => {
    const a = new Complex(1, 0);
    const b = new Complex(1 + Complex.EPSILON, 0);
    expect(a.equals(b)).toBe(true);
  });
});