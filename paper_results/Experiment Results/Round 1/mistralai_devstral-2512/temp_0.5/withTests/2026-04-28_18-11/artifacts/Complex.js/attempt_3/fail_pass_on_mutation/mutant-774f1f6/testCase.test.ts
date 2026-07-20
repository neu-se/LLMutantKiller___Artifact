// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with undefined', () => {
  it('should correctly handle undefined input', () => {
    const c = new Complex(undefined);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});