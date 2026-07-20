import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return Infinity when subtracting two infinite complex numbers', () => {
    const c1 = new Complex('Infinity');
    const c2 = new Complex('Infinity');
    const result = c1.sub(c2);
    expect(result.equals(Complex['NAN'])).toBe(false);
    expect(result.isInfinite()).toBe(true);
  });
});