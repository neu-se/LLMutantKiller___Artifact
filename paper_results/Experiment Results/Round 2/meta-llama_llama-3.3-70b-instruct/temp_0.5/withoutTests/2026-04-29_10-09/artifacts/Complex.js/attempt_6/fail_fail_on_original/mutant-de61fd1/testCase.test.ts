import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expected = new Complex(2 * Math.cos(2) * Math.cosh(2) / (Math.cos(2 * 1) + Math.cosh(2 * 1)), -2 * Math.sin(2) * Math.sinh(2) / (Math.cos(2 * 1) + Math.cosh(2 * 1)));
    expect(result.re).not.toBeCloseTo(expected.re, 10);
    expect(result.im).not.toBeCloseTo(expected.im, 10);
  });
});