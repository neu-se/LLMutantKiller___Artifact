import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle division by zero and infinity', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(0, 0);
    expect(c1.div(0, 0).equals(Complex.INFINITY)).toBe(true);
  });
});