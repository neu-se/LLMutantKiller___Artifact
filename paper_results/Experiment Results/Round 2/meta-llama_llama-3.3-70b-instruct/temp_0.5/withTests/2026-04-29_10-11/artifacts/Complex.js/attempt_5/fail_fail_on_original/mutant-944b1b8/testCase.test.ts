import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should throw an error when trying to divide by zero in asech', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrowError();
  });
});