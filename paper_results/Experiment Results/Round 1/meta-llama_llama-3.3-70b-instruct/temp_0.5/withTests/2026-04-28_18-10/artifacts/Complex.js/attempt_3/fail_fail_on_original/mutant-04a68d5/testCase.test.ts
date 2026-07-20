import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    expect(sech.re).toBeCloseTo(2 * complex.re / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)), 10);
    expect(sech.im).toBeCloseTo(-2 * complex.im / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)), 10);
  });
});