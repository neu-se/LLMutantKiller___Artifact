import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.sech();

    // The correct formula for sech(a + bi) is:
    // sech(a + bi) = 2 / (e^(a + bi) + e^(-a - bi))
    // The implementation uses: [2 * cosh(a) * cos(b) / d, -2 * sinh(a) * sin(b) / d]
    // where d = cos(2b) - cosh(2a)

    const a = 0.1;
    const b = 0.1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});