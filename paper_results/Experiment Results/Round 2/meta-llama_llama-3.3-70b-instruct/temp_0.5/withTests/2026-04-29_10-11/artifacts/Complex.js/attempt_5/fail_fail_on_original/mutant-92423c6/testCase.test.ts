import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should handle the cosm1 function correctly', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x), 0);
    expect(result.equals(expected)).toBe(true);
  });
});