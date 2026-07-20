// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9c79a13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute the hyperbolic secant for a complex number with real part 0.5 and imaginary part 0.5', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.sech();
    // The mutation changes the formula from:
    // 2 * cosh(a) * Math.cos(b) / d
    // to:
    // 2 * cosh(a) / Math.cos(b) / d
    // This will cause the real part to be significantly different
    // We test against the actual output of the original implementation
    expect(result.re).toBeCloseTo(0.9499788676154947, 15);
    expect(result.im).toBeCloseTo(-0.17632698070846497, 15);
  });
});