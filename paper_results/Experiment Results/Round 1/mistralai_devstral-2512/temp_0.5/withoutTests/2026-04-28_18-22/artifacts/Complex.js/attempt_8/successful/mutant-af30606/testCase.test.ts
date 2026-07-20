import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number where sinh(a) != 1", () => {
    // Choose a value where sinh(a) is significantly different from 1
    const c = new Complex(1.5, 0.5);
    const result = c.sech();

    // Calculate expected values using the original formula:
    // sech(c) = 2 / (e^c + e^-c)
    // For complex c = a + bi:
    // real = 2 * cosh(a) * cos(b) / (cos(2b) + cosh(2a))
    // imag = -2 * sinh(a) * sin(b) / (cos(2b) + cosh(2a))
    const a = 1.5;
    const b = 0.5;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});