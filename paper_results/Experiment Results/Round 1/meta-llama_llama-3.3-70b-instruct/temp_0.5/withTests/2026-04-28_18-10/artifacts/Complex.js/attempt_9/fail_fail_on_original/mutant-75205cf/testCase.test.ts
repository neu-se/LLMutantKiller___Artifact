import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result when subtracting Infinity from Infinity', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    expect(complex1.sub(complex2).toString()).toBe('NaN');
    expect(complex1.sub(complex2)).toBeInstanceOf(Complex);
  });
});