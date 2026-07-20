import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should have an acot method that returns a value', () => {
    const complex = new Complex(1, 2);
    expect(complex.acot()).toBeDefined();
  });
});