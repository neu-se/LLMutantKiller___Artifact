import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const expected = new Complex(
      Math.sin(1) * Math.cosh(2) / (0.5 * Math.cosh(2 * 2) - 0.5 * Math.cos(2 * 1)),
      -Math.cos(1) * Math.sinh(2) / (0.5 * Math.cosh(2 * 2) - 0.5 * Math.cos(2 * 1))
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});