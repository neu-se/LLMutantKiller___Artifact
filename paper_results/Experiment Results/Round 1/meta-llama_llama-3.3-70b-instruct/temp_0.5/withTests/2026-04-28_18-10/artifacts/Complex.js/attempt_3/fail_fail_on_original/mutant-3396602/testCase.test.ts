import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const expected = new Complex(
      Math.sin(1) * Math.cosh(1) / (0.5 * (Math.cosh(2 * 1) - Math.cos(2 * 1))),
      -Math.cos(1) * Math.sinh(1) / (0.5 * (Math.cosh(2 * 1) - Math.cos(2 * 1)))
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});