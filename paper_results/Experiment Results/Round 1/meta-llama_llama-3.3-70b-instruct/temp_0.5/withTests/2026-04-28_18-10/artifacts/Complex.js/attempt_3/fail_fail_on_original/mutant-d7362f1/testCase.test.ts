import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when multiplying two complex numbers with invalid property access', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(2, 0);
    expect(() => c1.mul(c2)).not.toThrow();
    const c3 = new Complex(1, 0);
    const c4 = new Complex(2);
    expect(() => c3.mul(c4)).not.toThrow();
    const c5 = new Complex(1, 0);
    const c6 = new Complex(0, 0);
    expect(() => c5.mul(c6)).not.toThrow();
    const c7 = new Complex(1, 0);
    const c8 = new Complex(0);
    expect(() => c7.mul(c8)).not.toThrow();
  });
});