import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const originalResult = new Complex(
      Math.sin(complex.re) * Math.cosh(complex.im) / (0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re)),
      -Math.cos(complex.re) * Math.sinh(complex.im) / (0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re))
    );
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});