import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate ceil with decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(1.24, 2);
    expect(result.im).toBeCloseTo(6.79, 2);
  });
});