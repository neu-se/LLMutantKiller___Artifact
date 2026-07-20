import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 0);
    expect(complex.sech().re).toBeCloseTo(2 * complex.re * Math.cos(complex.im) / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)));
    expect(complex.sech().im).toBeCloseTo(-2 * complex.im * Math.sin(complex.im) / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)));
  });
});