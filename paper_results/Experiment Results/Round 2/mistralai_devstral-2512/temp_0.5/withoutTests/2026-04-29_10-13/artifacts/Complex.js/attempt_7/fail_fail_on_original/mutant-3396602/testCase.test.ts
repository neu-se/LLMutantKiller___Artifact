// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3396602/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc', () => {
  it('should compute the cosecant of a complex number with real part 0.5 and imaginary part 0.5', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    // First let's see what the actual values are from the original implementation
    console.log('Actual result:', result.re, result.im);
    expect(result.re).toBeCloseTo(1.0782296946540224, 10);
    expect(result.im).toBeCloseTo(-0.4921125203510394, 10);
  });
});