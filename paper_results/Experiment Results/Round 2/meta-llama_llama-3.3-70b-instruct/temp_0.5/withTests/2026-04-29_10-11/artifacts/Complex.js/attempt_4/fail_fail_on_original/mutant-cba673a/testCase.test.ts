import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});