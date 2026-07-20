import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch()", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.csch();

    // The mutation changes division to multiplication in the imaginary component
    // This test checks that the imaginary component is correctly divided by d
    // rather than multiplied by it

    // Calculate expected values manually
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.sin(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.cos(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});