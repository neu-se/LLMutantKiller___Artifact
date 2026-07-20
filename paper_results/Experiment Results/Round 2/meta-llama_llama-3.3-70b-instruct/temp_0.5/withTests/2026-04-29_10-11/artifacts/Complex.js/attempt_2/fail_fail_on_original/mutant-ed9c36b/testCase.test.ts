import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.sec();
    const expected = new Complex(
      Math.cos(1) * Math.cosh(2) / (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 2)),
      Math.sin(1) * Math.sinh(2) / (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 2))
    );
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});