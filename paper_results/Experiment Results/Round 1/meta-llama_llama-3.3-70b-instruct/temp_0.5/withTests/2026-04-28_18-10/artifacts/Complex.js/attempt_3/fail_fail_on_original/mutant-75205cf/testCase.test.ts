import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return Infinity when subtracting Infinity from Infinity', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    expect(complex1.sub(complex2).toString()).toBe('NaN');
    const complex3 = new Complex('Infinity');
    const complex4 = new Complex(1);
    expect(complex3.sub(complex4).toString()).toBe('Infinity');
  });
});