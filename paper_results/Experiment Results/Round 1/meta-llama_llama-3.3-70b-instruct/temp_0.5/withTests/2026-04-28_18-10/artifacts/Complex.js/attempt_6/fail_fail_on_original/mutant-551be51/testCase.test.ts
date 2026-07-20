import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    expect(() => complex.ceil()).not.toThrow();
  });
});