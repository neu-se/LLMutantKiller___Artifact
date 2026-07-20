import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle atanh for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const complex2 = new Complex(-2, 0);
    const result2 = complex2.atanh();
    expect(result2.im).not.toBeCloseTo(result.im);
  });
});