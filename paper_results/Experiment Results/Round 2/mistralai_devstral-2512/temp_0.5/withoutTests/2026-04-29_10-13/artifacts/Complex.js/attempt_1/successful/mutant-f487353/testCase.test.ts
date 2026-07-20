import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should return the correct cosecant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    const expectedRe = Math.sin(1) * cosh(1) / (0.5 * cosh(2) - 0.5 * Math.cos(2));
    const expectedIm = -Math.cos(1) * sinh(1) / (0.5 * cosh(2) - 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});

function cosh(x: number): number {
  return (Math.exp(x) + Math.exp(-x)) * 0.5;
}

function sinh(x: number): number {
  return (Math.exp(x) - Math.exp(-x)) * 0.5;
}