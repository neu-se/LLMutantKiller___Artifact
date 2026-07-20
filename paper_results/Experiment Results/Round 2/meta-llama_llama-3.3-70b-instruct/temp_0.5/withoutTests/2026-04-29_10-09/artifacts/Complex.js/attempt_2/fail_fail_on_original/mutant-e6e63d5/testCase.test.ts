import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should throw an error when acsc is called on a complex number', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.acsc()).toThrowError();
  });
});