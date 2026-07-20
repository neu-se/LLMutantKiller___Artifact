import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});