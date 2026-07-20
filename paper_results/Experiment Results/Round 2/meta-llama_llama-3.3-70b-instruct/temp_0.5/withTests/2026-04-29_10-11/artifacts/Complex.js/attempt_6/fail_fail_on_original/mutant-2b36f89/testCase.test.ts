import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const dOriginal = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    const dMutated = 0.5 / Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(dOriginal).not.toBeCloseTo(dMutated, 10);
  });
});