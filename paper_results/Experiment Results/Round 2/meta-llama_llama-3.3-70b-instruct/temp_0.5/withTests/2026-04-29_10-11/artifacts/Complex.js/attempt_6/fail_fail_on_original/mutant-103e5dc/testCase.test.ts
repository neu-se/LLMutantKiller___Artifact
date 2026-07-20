import { Complex } from "../../complex";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const original = new Complex(
      Math.sin(1) * Math.cosh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2)),
      -Math.cos(1) * Math.sinh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2))
    );
    expect(result.re).toBeCloseTo(original.re, 10);
    expect(result.im).toBeCloseTo(original.im, 10);
  });
});