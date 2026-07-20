import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should handle addition of two complex numbers correctly', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    expect(c1.add(c2).equals(Complex['INFINITY'])).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.add(c4).equals(Complex['NAN'])).toBe(true);
    const c5 = new Complex(Infinity, Infinity);
    const c6 = new Complex(Infinity, 0);
    expect(c5.add(c6).equals(Complex['INFINITY'])).toBe(true);
  });
});