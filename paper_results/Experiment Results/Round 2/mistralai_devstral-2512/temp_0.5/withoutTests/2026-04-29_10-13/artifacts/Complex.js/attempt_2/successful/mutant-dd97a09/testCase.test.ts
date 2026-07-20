import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(2) / (Math.cos(4) + Math.cosh(2));
    const expectedIm = -2 * Math.sinh(1) * Math.sin(2) / (Math.cos(4) + Math.cosh(2));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});