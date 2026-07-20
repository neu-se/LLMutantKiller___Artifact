import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(10.234, 5.678);
    const result = complex.ceil(10);
    expect(result.re).toBeCloseTo(10.3, 1); 
    expect(result.im).toBeCloseTo(5.7, 1);
  });
});