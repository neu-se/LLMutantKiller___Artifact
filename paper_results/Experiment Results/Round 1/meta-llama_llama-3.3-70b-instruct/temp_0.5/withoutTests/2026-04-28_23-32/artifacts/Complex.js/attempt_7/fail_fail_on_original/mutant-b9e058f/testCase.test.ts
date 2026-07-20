import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle addition of two complex numbers correctly', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.add(c2).equals(Complex['NAN'])).toBe(true);
    const c3 = new Complex(1, 1);
    expect(c1.add(c3).equals(Complex['INFINITY'])).toBe(true);
    const c4 = new Complex(Infinity, Infinity);
    expect(c1.add(c4).equals(Complex['NAN'])).toBe(true);
  });
});