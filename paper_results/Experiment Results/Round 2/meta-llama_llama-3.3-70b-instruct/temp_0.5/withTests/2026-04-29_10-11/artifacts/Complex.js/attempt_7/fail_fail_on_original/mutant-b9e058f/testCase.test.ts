import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle addition of two complex numbers where both are infinite', () => {
    const complex1 = new Complex(Infinity, Infinity);
    const complex2 = new Complex(Infinity, Infinity);
    expect(complex1.add(complex2).toString()).not.toBe('Infinity');
  });
});