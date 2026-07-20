import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.ceil(1);
    expect(result.re).toBeCloseTo(1, 0); 
    expect(result.im).toBeCloseTo(1, 0);
  });
});