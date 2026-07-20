// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9c79a13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute the hyperbolic secant for a complex number with real part 0.1 and imaginary part 0.1', () => {
    const z = new Complex(0.1, 0.1);
    const result = z.sech();
    // Calculate expected values using the correct formula
    const a = 0.1, b = 0.1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    // The mutation changes division to multiplication in the real part calculation
    // This will cause a significant difference in the result
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});