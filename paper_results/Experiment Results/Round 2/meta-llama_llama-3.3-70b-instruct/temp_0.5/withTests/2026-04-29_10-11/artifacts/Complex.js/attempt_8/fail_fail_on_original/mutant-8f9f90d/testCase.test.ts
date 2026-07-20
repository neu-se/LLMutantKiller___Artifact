import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have a defined property "re" after calling atanh', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(result).toHaveProperty('re');
  });
});