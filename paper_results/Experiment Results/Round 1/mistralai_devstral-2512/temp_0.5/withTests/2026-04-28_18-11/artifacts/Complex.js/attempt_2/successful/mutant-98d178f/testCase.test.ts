// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-98d178f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.atanh', () => {
  it('should correctly compute atanh for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes x['im'] to x[""], which should cause NaN in the imaginary part
    expect(result.im).not.toBeNaN();
    // Also verify the result is a valid complex number
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});