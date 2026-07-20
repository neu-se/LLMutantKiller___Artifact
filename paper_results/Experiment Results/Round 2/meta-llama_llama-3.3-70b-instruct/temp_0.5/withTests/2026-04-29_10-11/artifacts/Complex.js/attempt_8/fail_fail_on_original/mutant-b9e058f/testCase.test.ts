import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly handle addition of two complex numbers where both are infinite', () => {
    const complex1 = new Complex(Infinity, Infinity);
    const complex2 = new Complex(1, 1);
    expect(complex1.add(complex2).toString()).toBe('Infinity');
    const complex3 = new Complex(Infinity, Infinity);
    const complex4 = new Complex(Infinity, Infinity);
    expect(complex3.add(complex4).toString()).not.toBe('Infinity');
  });
});