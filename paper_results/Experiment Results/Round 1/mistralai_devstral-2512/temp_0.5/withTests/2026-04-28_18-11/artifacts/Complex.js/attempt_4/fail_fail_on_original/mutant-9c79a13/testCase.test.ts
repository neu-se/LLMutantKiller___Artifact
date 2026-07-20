// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9c79a13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute the hyperbolic secant for a complex number with real part 0.1 and imaginary part 0.1', () => {
    const z = new Complex(0.1, 0.1);
    const result = z.sech();
    // The mutation changes the formula from division to multiplication in the real part
    // This test will pass on original code but fail on mutated code
    expect(result.re).toBeCloseTo(0.9900, 4);
    expect(result.im).toBeCloseTo(-0.0998, 4);
  });
});