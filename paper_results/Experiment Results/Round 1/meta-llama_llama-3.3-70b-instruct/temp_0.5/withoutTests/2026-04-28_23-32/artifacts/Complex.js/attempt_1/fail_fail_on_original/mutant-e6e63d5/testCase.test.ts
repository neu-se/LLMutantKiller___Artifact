import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result).not.toBeUndefined();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});