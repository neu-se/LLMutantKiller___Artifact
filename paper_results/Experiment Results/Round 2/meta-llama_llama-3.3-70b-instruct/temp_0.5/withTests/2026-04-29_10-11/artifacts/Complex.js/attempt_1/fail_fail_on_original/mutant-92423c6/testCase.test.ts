import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should handle the cosm1 function correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(0.1) - 1);
    expect(result.equals(expected)).toBe(true);
  });
});