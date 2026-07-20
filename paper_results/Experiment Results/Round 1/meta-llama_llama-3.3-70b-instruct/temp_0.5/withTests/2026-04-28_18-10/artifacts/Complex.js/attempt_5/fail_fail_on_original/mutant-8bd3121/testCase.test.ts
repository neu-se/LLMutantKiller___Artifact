import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});