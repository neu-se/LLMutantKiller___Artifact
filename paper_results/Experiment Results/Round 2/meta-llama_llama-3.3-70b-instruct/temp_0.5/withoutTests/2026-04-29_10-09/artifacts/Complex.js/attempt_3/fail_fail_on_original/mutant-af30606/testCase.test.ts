import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate sech", () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expected = new Complex(
      2 / (Math.cos(2 * complex.re) + Math.cosh(2 * complex.im)),
      -2 * Math.sinh(complex.re) * Math.sin(complex.im) / (Math.cos(2 * complex.re) + Math.cosh(2 * complex.im))
    );
    expect(result.re).toBeCloseTo(expected.re, 3);
    expect(result.im).toBeCloseTo(expected.im, 3);
  });
});