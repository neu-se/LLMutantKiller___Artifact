// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.add', () => {
  it('should handle addition with one infinite component correctly', () => {
    const c1 = new Complex(Infinity, 5);
    const c2 = new Complex(3, 4);
    const result = c1.add(c2);
    expect(result.isInfinite()).toBe(true);
  });
});