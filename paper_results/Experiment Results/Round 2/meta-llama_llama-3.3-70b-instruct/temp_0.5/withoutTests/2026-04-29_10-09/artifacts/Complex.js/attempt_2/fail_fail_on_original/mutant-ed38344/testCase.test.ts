import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return Infinity when subtracting two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 0);
    expect(c1.sub(c2).toString()).toBe('Infinity');
  });
});