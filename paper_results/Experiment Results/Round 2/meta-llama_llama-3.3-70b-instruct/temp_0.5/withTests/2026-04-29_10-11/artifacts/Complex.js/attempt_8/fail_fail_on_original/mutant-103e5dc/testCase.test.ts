import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const expectedRe = Math.sin(1) * Math.cosh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2));
    const expectedIm = -Math.cos(1) * Math.sinh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});