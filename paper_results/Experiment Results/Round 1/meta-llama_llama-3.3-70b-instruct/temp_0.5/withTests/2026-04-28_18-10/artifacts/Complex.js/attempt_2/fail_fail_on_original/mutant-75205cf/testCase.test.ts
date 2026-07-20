import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return Infinity when subtracting Infinity from a finite number', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex(1);
    expect(complex1.sub(complex2).toString()).toBe('Infinity');
  });
});