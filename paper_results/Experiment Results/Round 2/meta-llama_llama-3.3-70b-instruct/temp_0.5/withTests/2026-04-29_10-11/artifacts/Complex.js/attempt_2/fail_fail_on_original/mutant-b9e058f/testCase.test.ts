import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle addition of two infinite complex numbers', () => {
    const complex1 = new Complex(Infinity, Infinity);
    const complex2 = new Complex(1, 1);
    expect(complex1.add(complex2).toString()).toBe('Infinity');
  });
});