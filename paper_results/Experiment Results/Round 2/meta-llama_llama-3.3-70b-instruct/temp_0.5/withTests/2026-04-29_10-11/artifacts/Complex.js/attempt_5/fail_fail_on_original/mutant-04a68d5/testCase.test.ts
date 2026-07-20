import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should not throw an error when calculating sech', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});