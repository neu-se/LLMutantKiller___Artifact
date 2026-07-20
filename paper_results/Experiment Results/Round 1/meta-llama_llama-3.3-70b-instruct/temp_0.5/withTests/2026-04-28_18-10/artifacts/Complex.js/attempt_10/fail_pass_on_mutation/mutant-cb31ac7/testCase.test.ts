import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return correct result for expm1 function with a specific small input and high precision', () => {
    const complex = new Complex(1e-12);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(1e-12, 12);
  });
});