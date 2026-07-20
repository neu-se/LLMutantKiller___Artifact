import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const acot = complex.acot();
    expect(acot.re).not.toBeNaN();
    expect(acot.im).not.toBeNaN();
  });
});