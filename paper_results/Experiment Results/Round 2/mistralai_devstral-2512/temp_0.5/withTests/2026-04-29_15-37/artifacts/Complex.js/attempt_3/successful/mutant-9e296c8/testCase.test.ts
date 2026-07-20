import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 0.5", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.csch();
    const expectedRe = -2 * Math.sinh(0.5) * Math.cos(0.5) / (Math.cos(1) - Math.cosh(1));
    const expectedIm = 2 * Math.cosh(0.5) * Math.sin(0.5) / (Math.cos(1) - Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});