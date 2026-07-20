import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a purely real number", () => {
    const c = new Complex(1, 0);
    const result = c.sech();
    const expectedRe = 1 / Math.cosh(1);
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});