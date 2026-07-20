import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(1);
    const result = complex.exp().sub(1);
    const expected = complex.expm1();
    expect(result.equals(expected)).toBe(true);
  });
});