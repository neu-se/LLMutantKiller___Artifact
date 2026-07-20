// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-de61fd1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes the denominator from cos(2b) + cosh(2a) to cos(2b) - cosh(2a)
    // This will produce a different result, especially noticeable in the real part
    // Using the actual computed values from the original implementation
    expect(result.re).toBeCloseTo(0.49833703055518686, 10);
    expect(result.im).toBeCloseTo(-0.5910838417210451, 10);
  });
});