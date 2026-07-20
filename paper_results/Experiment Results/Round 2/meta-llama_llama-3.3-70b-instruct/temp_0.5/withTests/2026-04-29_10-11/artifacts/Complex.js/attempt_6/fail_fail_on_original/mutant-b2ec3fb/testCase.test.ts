import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly floor the real part of a complex number', () => {
    const complex = new Complex(10.5, 0);
    const floored = complex.floor(0);
    expect(floored.re).toBe(10);
    expect(floored.im).toBe(0);
  });
  it('should return a number when floor function is called with a valid complex number', () => {
    const complex = new Complex(10.5, 0);
    const floored = complex.floor(0);
    expect(typeof floored.re).toBe('number');
  });
});