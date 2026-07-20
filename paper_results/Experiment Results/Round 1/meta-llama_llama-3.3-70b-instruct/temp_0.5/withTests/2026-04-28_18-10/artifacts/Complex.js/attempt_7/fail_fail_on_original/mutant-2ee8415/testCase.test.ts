import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have a property "re" after calling asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(Object.prototype.hasOwnProperty.call(result, 're')).toBe(true);
  });
});