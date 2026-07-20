import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should throw an error when calling asinh on a complex number in the mutated code', () => {
    const complex = new Complex('1+2i');
    expect(() => complex.asinh()).toThrowError();
  });
});