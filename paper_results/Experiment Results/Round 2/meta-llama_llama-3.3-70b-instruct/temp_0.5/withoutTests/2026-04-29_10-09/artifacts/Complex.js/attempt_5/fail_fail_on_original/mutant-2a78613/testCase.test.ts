import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a Complex object when multiplying two real complex numbers', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result).toBeInstanceOf(Complex);
  });
});