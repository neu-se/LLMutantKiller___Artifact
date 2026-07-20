import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return a Complex object with sech method', () => {
    const complex = new Complex(1, 1);
    expect(complex.sech()).toBeInstanceOf(Complex);
  });
});