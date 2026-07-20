import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a non-zero value for acot when the input is a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(-0.7853981633974483, 5);
  });
});