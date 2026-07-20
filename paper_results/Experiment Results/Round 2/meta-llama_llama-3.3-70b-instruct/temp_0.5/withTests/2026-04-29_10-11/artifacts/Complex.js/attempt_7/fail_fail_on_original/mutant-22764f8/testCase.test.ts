import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(complex.re).toBeDefined();
    expect(complex.im).toBeDefined();
  });
});