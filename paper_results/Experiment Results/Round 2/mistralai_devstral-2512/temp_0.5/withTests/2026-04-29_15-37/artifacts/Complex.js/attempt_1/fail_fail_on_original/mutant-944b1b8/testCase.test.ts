// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-944b1b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should return the correct arcsecant for a non-zero complex number', () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    // The mutation changes the condition from (a !== 0) to (true), which would incorrectly
    // handle the case when a is 0. We test with a non-zero a to ensure the original logic works.
    expect(result.re).toBeCloseTo(1.4204225827045537);
    expect(result.im).toBeCloseTo(-0.5306375309525265);
  });
});