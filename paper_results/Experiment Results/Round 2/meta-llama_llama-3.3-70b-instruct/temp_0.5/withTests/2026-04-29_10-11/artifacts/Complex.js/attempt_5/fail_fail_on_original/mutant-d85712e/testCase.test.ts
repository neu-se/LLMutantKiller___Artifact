import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should throw an error for invalid input', () => {
    expect(() => new Complex('1+Stryker was here!i')).toThrow(SyntaxError);
  });
});