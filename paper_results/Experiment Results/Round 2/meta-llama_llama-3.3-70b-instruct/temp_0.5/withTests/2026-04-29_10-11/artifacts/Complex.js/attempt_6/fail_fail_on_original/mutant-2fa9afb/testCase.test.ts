import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should return correct result for sinh function', () => {
    const complex = new Complex(1, 1);
    const result = complex.sinh();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.sinh();
    expect(result2.re).toBe(0);
    expect(result2.im).toBe(0);
  });
});