import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should throw an error when creating a complex number with an object that only has one of "re" or "im" properties', () => {
    expect(() => new Complex({ re: 1 })).toThrow();
    expect(() => new Complex({ im: 2 })).toThrow();
  });
});