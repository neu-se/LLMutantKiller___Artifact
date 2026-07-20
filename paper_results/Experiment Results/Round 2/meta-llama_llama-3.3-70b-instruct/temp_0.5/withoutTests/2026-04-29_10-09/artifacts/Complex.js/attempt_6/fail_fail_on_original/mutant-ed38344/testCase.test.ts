import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).toString()).toBe('NaN');
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(1, 0);
    expect(c3.sub(c4).toString()).toBe('Infinity');
    expect(c1.sub(c3).toString()).not.toBe('Infinity');
  });
});