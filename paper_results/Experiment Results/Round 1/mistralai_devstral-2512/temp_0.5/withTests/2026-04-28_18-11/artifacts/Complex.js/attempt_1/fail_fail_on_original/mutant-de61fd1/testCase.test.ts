// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-de61fd1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The expected result is derived from the formula:
    // sech(a + bi) = 1 / cosh(a + bi) = 2 / (e^(a + bi) + e^(-a - bi))
    // For a=1, b=1:
    // cosh(1 + i) = cosh(1)cos(1) + i sinh(1)sin(1)
    // sech(1 + i) = 2 / (cosh(1)cos(1) + i sinh(1)sin(1)) * conjugate / magnitude
    // The mutation changes the denominator from cos(2b) + cosh(2a) to cos(2b) - cosh(2a)
    // This will produce a different result, especially noticeable in the real part
    expect(result.re).toBeCloseTo(0.4161468365471424, 10);
    expect(result.im).toBeCloseTo(-0.0, 10);
  });
});