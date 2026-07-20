import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.im).toBeCloseTo(-Math.cos(1) * Math.sinh(1) / (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 1)), 1e-10);
  });
});