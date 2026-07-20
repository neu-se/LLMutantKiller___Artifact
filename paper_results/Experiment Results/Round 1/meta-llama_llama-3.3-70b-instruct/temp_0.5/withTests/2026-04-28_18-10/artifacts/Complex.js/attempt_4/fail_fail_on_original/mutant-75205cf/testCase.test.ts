import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result when subtracting two complex numbers', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    expect(complex1.sub(complex2).toString()).toBe('NaN');
    const complex3 = new Complex('Infinity');
    const complex4 = new Complex(1);
    expect(complex3.sub(complex4).toString()).toBe('Infinity');
    const complex5 = new Complex('Infinity');
    const complex6 = new Complex('Infinity');
    expect(complex5.sub(complex6).sub.toString()).not.toBeUndefined();
  });
});