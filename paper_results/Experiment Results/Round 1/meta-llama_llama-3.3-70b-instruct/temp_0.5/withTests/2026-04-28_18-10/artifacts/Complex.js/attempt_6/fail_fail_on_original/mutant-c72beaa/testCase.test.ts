import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return a finite value for acot when the input is a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    expect(isFinite(acot.re)).toBe(true);
    expect(isFinite(acot.im)).toBe(true);
  });
});